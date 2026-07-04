// Terminal I/O: raw mode, alt-screen, cursor, bracketed paste, resize, and the
// mandatory cleanup that must always restore the terminal. Pure key parsing is
// delegated to keys.mjs and re-exported for tests.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/term.py

import { parseKeys, flushEscape, makeParserState } from "./keys.mjs";

export { parseKeys, flushEscape, makeParserState };

export const ESC = "\x1b";
export const CSI = "\x1b[";
export const ALT_ON = "\x1b[?1049h";
export const ALT_OFF = "\x1b[?1049l";
export const CUR_HIDE = "\x1b[?25l";
export const CUR_SHOW = "\x1b[?25h";
export const PASTE_ON = "\x1b[?2004h";
export const PASTE_OFF = "\x1b[?2004l";
export const CLEAR = "\x1b[2J";
export const HOME = "\x1b[H";
export const EL = "\x1b[K";
export const SGR0 = "\x1b[0m";
export const moveTo = (row, col) => `\x1b[${row};${col}H`;

const ENTER_SEQ = ALT_ON + CLEAR + HOME + CUR_HIDE + PASTE_ON;
const EXIT_SEQ = SGR0 + PASTE_OFF + CUR_SHOW + ALT_OFF;
const ESC_TIMEOUT_MS = 40;

export function makeTerm({
  input = process.stdin,
  output = process.stdout,
  cols = null,
  rows = null,
  interactive = true,
} = {}) {
  let started = false;
  let restored = false;
  let escTimer = null;
  const pstate = makeParserState();
  const cbs = { key: () => {}, paste: () => {}, resize: () => {} };
  const hooks = [];

  const isTTY = () => {
    if (cols != null && rows != null) return true; // injected: treat as usable
    return Boolean(input.isTTY && output.isTTY);
  };

  const size = () => {
    if (cols != null && rows != null) return { cols, rows };
    return { cols: output.columns || 80, rows: output.rows || 24 };
  };

  const write = (s) => output.write(s);

  const dispatch = (events) => {
    for (const ev of events) {
      if (ev.type === "paste") cbs.paste(ev.text);
      else cbs.key(ev);
    }
  };

  const onData = (chunk) => {
    if (escTimer) {
      clearTimeout(escTimer);
      escTimer = null;
    }
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    const { events } = parseKeys(buf, pstate);
    dispatch(events);
    if (pstate.mode === "ESC" && pstate.escPending) {
      escTimer = setTimeout(() => {
        escTimer = null;
        const { events } = flushEscape(pstate);
        dispatch(events);
      }, ESC_TIMEOUT_MS);
    }
  };

  const onResize = () => cbs.resize();

  const stop = () => {
    if (restored) return;
    restored = true;
    if (escTimer) {
      clearTimeout(escTimer);
      escTimer = null;
    }
    if (interactive && isTTY()) {
      try {
        write(EXIT_SEQ);
      } catch (_) {}
      try {
        if (input.isTTY && input.setRawMode) input.setRawMode(false);
      } catch (_) {}
      try {
        input.pause();
      } catch (_) {}
    }
    input.removeListener("data", onData);
    output.removeListener("resize", onResize);
    for (const [sig, fn] of hooks) process.removeListener(sig, fn);
  };

  const start = () => {
    if (started) return;
    started = true;
    if (interactive && isTTY()) {
      if (input.isTTY && input.setRawMode) input.setRawMode(true);
      write(ENTER_SEQ);
      input.resume();
      output.on("resize", onResize);
    }
    input.on("data", onData);

    const onExit = () => stop();
    const onSig = (sig, code) => () => {
      stop();
      process.exit(code);
    };
    const onUncaught = (err) => {
      stop();
      // print AFTER restoring the normal screen so the trace is readable
      console.error(err && err.stack ? err.stack : String(err));
      process.exit(1);
    };
    const reg = [
      ["exit", onExit],
      ["SIGTERM", onSig("SIGTERM", 143)],
      ["SIGHUP", onSig("SIGHUP", 129)],
      ["uncaughtException", onUncaught],
    ];
    for (const [sig, fn] of reg) {
      process.on(sig, fn);
      hooks.push([sig, fn]);
    }
  };

  return {
    isTTY,
    size,
    write,
    start,
    stop,
    onKey: (cb) => (cbs.key = cb),
    onPaste: (cb) => (cbs.paste = cb),
    onResize: (cb) => (cbs.resize = cb),
    _feed: onData, // test seam: inject raw bytes
  };
}
