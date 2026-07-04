// Lorem screen: generate fake Georgian text (sentences / paragraphs / names).
// Generation runs on demand (g) via the injected lorem module.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/screens/lorem.py

import lorem from "../../lib/lorem.mjs";
import * as ui from "../ui.mjs";

export const id = "lorem";
export const label = "Lorem";
export const title = "ლორემი";
export const canInput = false;

const KINDS = ["sentences", "paragraphs", "names"];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function init() {
  return { kind: "sentences", words: 8, paragraphs: 2, names: 5, output: "", scroll: 0 };
}

function generate(s, ctx) {
  const L = (ctx && ctx.lorem) || lorem;
  let out = "";
  if (s.kind === "sentences") out = L.sentences(s.words);
  else if (s.kind === "paragraphs") out = L.paragraphs(s.words, s.paragraphs);
  else out = L.names(s.names).join("\n");
  return { ...s, output: out, scroll: 0 };
}

export function update(s, event, ctx) {
  const name = event.type === "char" ? event.char : event.name;
  switch (name) {
    case "k":
      return { ...s, kind: KINDS[(KINDS.indexOf(s.kind) + 1) % KINDS.length] };
    case "+":
    case "=":
      if (s.kind === "names") return { ...s, names: clamp(s.names + 1, 1, 20) };
      return { ...s, words: clamp(s.words + 1, 1, 200) };
    case "-":
    case "_":
      if (s.kind === "names") return { ...s, names: clamp(s.names - 1, 1, 20) };
      return { ...s, words: clamp(s.words - 1, 1, 200) };
    case "p":
      return { ...s, paragraphs: clamp(s.paragraphs + 1, 1, 10) };
    case "P":
      return { ...s, paragraphs: clamp(s.paragraphs - 1, 1, 10) };
    case "g":
      return generate(s, ctx);
    case "down":
      return { ...s, scroll: s.scroll + 1 };
    case "up":
      return { ...s, scroll: Math.max(0, s.scroll - 1) };
    default:
      return s;
  }
}

export function getCopyText(s) {
  return s.output || null;
}

export function status(s) {
  const amt = s.kind === "names" ? `names: ${s.names}` : `words: ${s.words}` + (s.kind === "paragraphs" ? `  paragraphs: ${s.paragraphs}` : "");
  return { hint: `kind: ${s.kind}  ${amt}` };
}

export function footer() {
  return "k kind  +/- amount  p paras  g gen  ↑↓ scroll  y copy";
}

export function render(s, box, style) {
  const C = box.cols;
  const R = box.rows;
  const lines = [];
  // settings chips
  const kindPills = KINDS.map((k) => ui.pill(k, k === s.kind, style)).join("");
  lines.push("kind:   " + kindPills);
  const amt = s.kind === "names" ? `count: ${s.names}` : `words: ${s.words}` + (s.kind === "paragraphs" ? `   paragraphs: ${s.paragraphs}` : "");
  lines.push(ui.padEnd(amt, C));
  lines.push(ui.blank(C));

  const header = lines.length;
  const bodyRows = Math.max(1, R - header - 2);
  const body = [];
  if (!s.output) {
    body.push(style.on ? style.dim() + "press g to generate" + style.reset() : "press g to generate");
  } else {
    const wrapped = ui.wrapText(s.output, C - 4);
    const start = clamp(s.scroll, 0, Math.max(0, wrapped.length - bodyRows));
    for (let i = start; i < wrapped.length; i++) body.push(wrapped[i]);
  }
  while (body.length < bodyRows) body.push("");
  lines.push(ui.boxTop(C, "output"));
  for (let i = 0; i < bodyRows; i++) lines.push(ui.boxLine(body[i] || "", C));
  lines.push(ui.boxBottom(C));

  return ui.frame(lines, C, R);
}
