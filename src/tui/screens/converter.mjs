// Converter screen: live script transliteration. Auto mode uses interpret()
// (source auto-detected); manual mode uses convert() with explicit from/to.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/screens/converter.py

import core from "../../lib/core.mjs";
import { classifyText } from "../../lib/utils.mjs";
import data from "../../lib/data.mjs";
import * as ui from "../ui.mjs";

export const id = "converter";
export const label = "Converter";
export const title = "გადაყვანა";
export const canInput = true;

const SOURCES = ["mkhedruli", "mtavruli", "asomtavruli", "nuskhuri", "qwerty", "braille"];
const BICAMERAL = ["khutsuri", "shanidziseuli", "tfileliseuli", "sasataure"];
const TO_TARGETS = Object.keys(data.alphabets).filter((k) => k !== "names").concat(BICAMERAL);

function recompute(s) {
  const text = s.input.text;
  let detected = null;
  let output = "";
  let error = null;
  if (text) {
    try {
      detected = classifyText(text);
    } catch (_) {
      detected = null;
    }
    try {
      output = s.mode === "auto" ? core.interpret(text, s.to) : core.convert(text, s.from, s.to);
    } catch (e) {
      error = e && e.message ? e.message : String(e);
      output = "";
    }
  }
  return { ...s, detected, output, error };
}

export function init() {
  return recompute({
    input: ui.makeInput(""),
    mode: "auto",
    from: "mkhedruli",
    to: "mtavruli",
    detected: null,
    output: "",
    error: null,
    focus: "normal",
  });
}

function cycle(list, cur, dir) {
  const i = list.indexOf(cur);
  const n = list.length;
  return list[(((i + dir) % n) + n) % n];
}

export function update(s, event, ctx) {
  if (s.focus === "input") {
    const input = ui.inputHandle(s.input, event);
    return recompute({ ...s, input });
  }
  const name = event.type === "char" ? event.char : event.name;
  switch (name) {
    case "i":
    case "enter":
      return { ...s, focus: "input" };
    case "m":
      return recompute({ ...s, mode: s.mode === "auto" ? "manual" : "auto" });
    case "f":
      if (s.mode !== "manual") return { ...s, _toast: "switch to manual (m) to pick a source" };
      return recompute({ ...s, from: cycle(SOURCES, s.from, 1) });
    case "F":
      if (s.mode !== "manual") return { ...s, _toast: "switch to manual (m) to pick a source" };
      return recompute({ ...s, from: cycle(SOURCES, s.from, -1) });
    case "o":
      return recompute({ ...s, to: cycle(TO_TARGETS, s.to, 1) });
    case "O":
      return recompute({ ...s, to: cycle(TO_TARGETS, s.to, -1) });
    case "s": {
      if (s.mode !== "manual") return { ...s, _toast: "swap works in manual mode (m)" };
      if (!SOURCES.includes(s.to)) return { ...s, _toast: `cannot swap: '${s.to}' is not a source script` };
      return recompute({ ...s, from: s.to, to: s.from });
    }
    case "x":
      return recompute({ ...s, input: ui.makeInput("") });
    default:
      return s;
  }
}

export function getCopyText(s) {
  return s.output || null;
}

export function status(s) {
  if (s.error) return { error: `error: ${s.error}` };
  if (s.mode === "auto") return { hint: `auto · detected: ${s.detected || "—"}` };
  return { hint: `${s.from} → ${s.to}` };
}

export function footer() {
  return "i edit  m mode  f/o pick  s swap  x clear  y copy";
}

// ---- render ----------------------------------------------------------------

function chipRow(prefix, items, current, style, dim) {
  const parts = items.map((it) => ui.pill(it, it === current, style));
  let s = prefix + parts.join("");
  if (dim && style.on) s = style.dim() + s + style.reset();
  return s;
}

// Compact "to" selector: the current target as a pill plus its position. There
// are 21 targets, so a full row would overflow — o/O cycles through them.
function toRow(current, style) {
  const idx = TO_TARGETS.indexOf(current);
  return "to:    " + ui.pill(current, true, style) + "   " + `${idx + 1}/${TO_TARGETS.length}  ‹o/O›`;
}

export function render(s, box, style) {
  const C = box.cols;
  const R = box.rows;
  const lines = [];
  const badge = s.mode === "auto" ? "auto" : `${s.from}→${s.to}`;
  lines.push(ui.boxTop(C, "input", badge));
  lines.push(ui.boxLineRich(ui.inputRender(s.input, C - 4, style, s.focus === "input"), C));
  lines.push(ui.boxBottom(C));
  lines.push(ui.blank(C));
  lines.push(chipRow("mode:  ", ["auto", "manual"], s.mode, style, false));
  lines.push(chipRow("from:  ", SOURCES, s.from, style, s.mode === "auto"));
  lines.push(toRow(s.to, style));
  lines.push(ui.blank(C));

  // output pane fills the remainder
  const headerRows = lines.length; // used above
  const outTop = ui.boxTop(C, "output");
  const outBottom = ui.boxBottom(C);
  const bodyRows = Math.max(1, R - headerRows - 2);
  const body = [];
  if (!s.input.text) {
    body.push(style.on ? style.dim() + "type to convert…" + style.reset() : "type to convert…");
  } else {
    const wrapped = ui.wrapText(s.output, C - 4);
    for (const l of wrapped) body.push(l);
  }
  while (body.length < bodyRows) body.push("");
  lines.push(outTop);
  for (let i = 0; i < bodyRows; i++) lines.push(ui.boxLine(body[i] || "", C));
  lines.push(outBottom);

  return ui.frame(lines, C, R);
}
