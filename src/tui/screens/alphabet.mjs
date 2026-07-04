// Alphabet screen: a grid of the letters in the chosen Georgian script with a
// detail card (GlyphTip analog) for the focused letter.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/screens/alphabet.py

import data from "../../lib/data.mjs";
import * as ui from "../ui.mjs";

export const id = "alphabet";
export const label = "Alphabet";
export const title = "ანბანი";
export const canInput = false;

const A = data.alphabets;
const SCRIPTS = ["mkhedruli", "mtavruli", "asomtavruli", "nuskhuri"];
const CORE = 33; // indices 0..32
const ARCHAIC = 38; // indices 0..37
const COLS = 11;

export function init() {
  return { script: "mkhedruli", archaic: false, cursor: 0 };
}

const count = (s) => (s.archaic ? ARCHAIC : CORE);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function update(s, event) {
  const name = event.type === "char" ? event.char : event.name;
  const n = count(s);
  switch (name) {
    case "h":
    case "left":
      return { ...s, cursor: clamp(s.cursor - 1, 0, n - 1) };
    case "l":
    case "right":
      return { ...s, cursor: clamp(s.cursor + 1, 0, n - 1) };
    case "k":
    case "up":
      return { ...s, cursor: clamp(s.cursor - COLS, 0, n - 1) };
    case "j":
    case "down":
      return { ...s, cursor: clamp(s.cursor + COLS, 0, n - 1) };
    case "g":
      return { ...s, cursor: 0 };
    case "G":
      return { ...s, cursor: n - 1 };
    case "c":
      return { ...s, script: SCRIPTS[(SCRIPTS.indexOf(s.script) + 1) % SCRIPTS.length] };
    case "a": {
      const archaic = !s.archaic;
      const nn = archaic ? ARCHAIC : CORE;
      return { ...s, archaic, cursor: clamp(s.cursor, 0, nn - 1) };
    }
    case "enter": {
      const glyph = A[s.script][s.cursor] || "";
      return glyph ? { ...s, _copy: glyph } : s;
    }
    default:
      return s;
  }
}

export function getCopyText(s) {
  return A[s.script][s.cursor] || null;
}

export function status(s) {
  return { hint: `${s.script} · ${s.cursor + 1}/${count(s)}` };
}

export function footer() {
  return "hjkl move  c script  a archaic  enter copy";
}

// ---- render ----------------------------------------------------------------

function gridBox(s, w, rows, style) {
  const n = count(s);
  const inner = w - 4;
  const cellW = inner >= COLS * 4 ? 4 : 3; // narrow panels drop the inter-cell gap
  const gridRows = Math.ceil(n / COLS);
  const cellsByRow = [];
  for (let r = 0; r < gridRows; r++) cellsByRow.push("");
  const off = !style.on;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / COLS);
    const g = A[s.script][i] || "—";
    let cell;
    if (i === s.cursor) {
      cell = off ? "▐" + g + "▌" : style.inverse() + " " + g + " " + style.reset();
    } else {
      cell = " " + g + " ";
    }
    // each cell is 3 visible columns of content + 1 trailing space = cellW
    cellsByRow[r] += cell + " ".repeat(cellW - 3);
  }
  const lines = [ui.boxTop(w, s.script, s.archaic ? "archaic" : "core")];
  lines.push(ui.boxLineRich("", w));
  for (const row of cellsByRow) lines.push(ui.boxLineRich(row, w));
  lines.push(ui.boxBottom(w));
  void inner;
  return ui.frame(lines, w, rows);
}

function detailBox(s, w, rows, style) {
  const i = s.cursor;
  const g = (key) => A[key][i] || "—";
  const rowsArr = [
    A.names[i] || "—",
    "",
    `mkhedruli   ${g("mkhedruli")}`,
    `mtavruli    ${g("mtavruli")}`,
    `asomtavruli ${g("asomtavruli")}`,
    `nuskhuri    ${g("nuskhuri")}`,
    "",
    `ipa         ${g("phonetic")}`,
    `braille     ${g("braille")}`,
    `numeric     ${g("numeric")}`,
    `qwerty      ${g("qwerty")}`,
  ];
  const lines = [ui.boxTop(w, "letter")];
  for (const r of rowsArr) lines.push(ui.boxLine(r, w));
  lines.push(ui.boxBottom(w));
  void style;
  return ui.frame(lines, w, rows);
}

export function render(s, box, style) {
  const C = box.cols;
  const R = box.rows;
  const detailW = Math.min(28, Math.max(20, Math.floor(C * 0.34)));
  const leftW = C - detailW - 1;
  const left = gridBox(s, leftW, R, style);
  const right = detailBox(s, detailW, R, style);
  const out = [];
  for (let i = 0; i < R; i++) out.push(left[i] + " " + right[i]);
  return ui.frame(out, C, R);
}
