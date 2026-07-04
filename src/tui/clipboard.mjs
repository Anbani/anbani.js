// OSC 52 clipboard write (pure string builder). Some terminals block OSC 52;
// there is no ack channel, so a failed copy degrades silently.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/clipboard.py

const OSC52_MAX = 100000;

export function osc52(text, env = {}) {
  let t = text || "";
  if (Buffer.byteLength(t, "utf8") > OSC52_MAX) t = t.slice(0, OSC52_MAX);
  const b64 = Buffer.from(t, "utf8").toString("base64");
  const seq = "\x1b]52;c;" + b64 + "\x07";
  if (env.TMUX) {
    // tmux passthrough: double every ESC and wrap in DCS
    return "\x1bPtmux;" + seq.replace(/\x1b/g, "\x1b\x1b") + "\x1b\\";
  }
  return seq;
}
