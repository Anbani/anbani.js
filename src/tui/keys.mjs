// Pure key parser: a byte state machine turning raw terminal input into a
// stream of normalised events. No timers, no I/O (the ESC-disambiguation timer
// lives in term.mjs and calls flushEscape). Handles UTF-8 (Georgian is 3-byte),
// arrow/nav keys, ctrl combos and bracketed paste, all resilient to a sequence
// being split across read chunks.
//
// Event shapes:
//   { type: "char", char }                      printable / multibyte codepoint
//   { type: "key", name, ctrl?, shift? }         named key (see NAMES below)
//   { type: "paste", text }                      bracketed-paste payload
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/keys.py

const PASTE_END = [0x1b, 0x5b, 0x32, 0x30, 0x31, 0x7e]; // ESC [ 2 0 1 ~
const PASTE_MAX = 65536;

export function makeParserState() {
  return {
    mode: "GROUND", // GROUND | ESC | CSI | SS3 | PASTE | UTF8
    csi: "",
    ss3: false,
    utf8Need: 0,
    utf8Bytes: [],
    pasteBytes: [],
    escPending: false,
  };
}

const key = (name, extra) => Object.assign({ type: "key", name }, extra || {});
const chr = (c) => ({ type: "char", char: c });

function decodeUtf8(bytes) {
  return Buffer.from(bytes).toString("utf8");
}

function groundByte(b, events, st) {
  if (b === 0x0d || b === 0x0a) events.push(key("enter"));
  else if (b === 0x09) events.push(key("tab"));
  else if (b === 0x7f || b === 0x08) events.push(key("backspace"));
  else if (b === 0x03) events.push(key("ctrl+c", { ctrl: true }));
  else if (b === 0x04) events.push(key("ctrl+d", { ctrl: true }));
  else if (b === 0x01) events.push(key("home"));
  else if (b === 0x05) events.push(key("end"));
  else if (b === 0x15) events.push(key("ctrl+u", { ctrl: true }));
  else if (b === 0x17) events.push(key("ctrl+w", { ctrl: true }));
  else if (b === 0x0b) events.push(key("ctrl+k", { ctrl: true }));
  else if (b === 0x1b) {
    st.mode = "ESC";
    st.escPending = true;
  } else if (b >= 0x20 && b <= 0x7e) events.push(chr(String.fromCharCode(b)));
  else if (b >= 0xc2 && b <= 0xf4) {
    st.mode = "UTF8";
    st.utf8Need = b < 0xe0 ? 2 : b < 0xf0 ? 3 : 4;
    st.utf8Bytes = [b];
  }
  // other C0 / stray continuation bytes: ignored
}

// Returns true if the byte was consumed, false if it must be reprocessed.
function escByte(b, events, st) {
  if (b === 0x5b) {
    st.mode = "CSI";
    st.csi = "";
    st.escPending = false;
    return true;
  }
  if (b === 0x4f) {
    st.mode = "SS3";
    st.escPending = false;
    return true;
  }
  events.push(key("escape"));
  st.escPending = false;
  st.mode = "GROUND";
  return false; // reprocess b in GROUND
}

function interpretCsi(params, final, events, st) {
  const letter = String.fromCharCode(final);
  const arrow = { A: "up", B: "down", C: "right", D: "left", H: "home", F: "end" };
  if (letter === "Z") {
    events.push(key("shift+tab", { shift: true }));
    return;
  }
  if (final === 0x7e) {
    // "~"-terminated: numeric parameter selects the key
    const num = parseInt(params.split(";")[0], 10);
    if (num === 200) {
      st.mode = "PASTE";
      st.pasteBytes = [];
      return;
    }
    const map = { 1: "home", 7: "home", 4: "end", 8: "end", 3: "delete", 5: "pageup", 6: "pagedown" };
    if (map[num]) events.push(key(map[num]));
    // 2 (insert), 201 (stray), unknown -> ignore
    return;
  }
  if (arrow[letter]) {
    const parts = params.split(";");
    const extra = {};
    if (parts.length >= 2) {
      const mod = parseInt(parts[1], 10) - 1;
      if (mod & 1) extra.shift = true;
      if (mod & 4) extra.ctrl = true;
    }
    events.push(key(arrow[letter], extra));
  }
  // unknown final -> ignore
}

function endsWith(arr, suffix) {
  if (arr.length < suffix.length) return false;
  const off = arr.length - suffix.length;
  for (let i = 0; i < suffix.length; i++) if (arr[off + i] !== suffix[i]) return false;
  return true;
}

function normalizePaste(text) {
  let out = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  // strip C0 controls except newline and tab
  return out.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "");
}

export function parseKeys(buffer, state) {
  const st = state || makeParserState();
  const events = [];
  let i = 0;
  while (i < buffer.length) {
    const b = buffer[i];
    switch (st.mode) {
      case "GROUND":
        groundByte(b, events, st);
        i++;
        break;
      case "ESC":
        if (escByte(b, events, st)) i++;
        break;
      case "CSI":
        if (b >= 0x40 && b <= 0x7e) {
          interpretCsi(st.csi, b, events, st);
          if (st.mode === "CSI") st.mode = "GROUND";
        } else {
          st.csi += String.fromCharCode(b);
        }
        i++;
        break;
      case "SS3": {
        const l = String.fromCharCode(b);
        const m = { A: "up", B: "down", C: "right", D: "left", H: "home", F: "end" };
        if (m[l]) events.push(key(m[l]));
        st.mode = "GROUND";
        i++;
        break;
      }
      case "UTF8":
        if (b >= 0x80 && b <= 0xbf) {
          st.utf8Bytes.push(b);
          if (st.utf8Bytes.length === st.utf8Need) {
            events.push(chr(decodeUtf8(st.utf8Bytes)));
            st.mode = "GROUND";
          }
          i++;
        } else {
          events.push(chr("�"));
          st.mode = "GROUND";
          // reprocess b in GROUND (do not increment)
        }
        break;
      case "PASTE":
        st.pasteBytes.push(b);
        if (endsWith(st.pasteBytes, PASTE_END)) {
          const content = st.pasteBytes.slice(0, st.pasteBytes.length - PASTE_END.length);
          const text = normalizePaste(decodeUtf8(content.slice(0, PASTE_MAX)));
          events.push({ type: "paste", text });
          st.pasteBytes = [];
          st.mode = "GROUND";
        }
        i++;
        break;
      default:
        st.mode = "GROUND";
        i++;
    }
  }
  return { events, state: st };
}

// Called by the term layer when the ESC-disambiguation timer fires with a lone
// ESC still pending: flush it as an `escape` key.
export function flushEscape(state) {
  const events = [];
  if (state && state.mode === "ESC") {
    events.push(key("escape"));
    state.mode = "GROUND";
    state.escPending = false;
  }
  return { events, state };
}
