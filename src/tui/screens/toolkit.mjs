// Toolkit screen: letter-frequency bar chart + Friedman index of coincidence.
// count()/frequency()/friedman() upper-case their input, so Georgian keys come
// back as MTAVRULI — we display them as returned.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/screens/toolkit.py

import toolkit from "../../lib/toolkit.mjs";
import * as ui from "../ui.mjs";

export const id = "toolkit";
export const label = "Toolkit";
export const title = "ხელსაწყოები";
export const canInput = true;

const GEO_RE = /[Ⴀ-ჿᲐ-Ჿⴀ-⴯]/;

function recompute(s) {
  const text = s.input.text;
  let stats = null;
  if (text) {
    try {
      const counts = toolkit.count(text);
      const friedman = toolkit.friedman(text);
      const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1));
      let total = 0;
      let geo = 0;
      for (const [k, n] of entries) {
        total += n;
        if (GEO_RE.test(k)) geo += n;
      }
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      stats = { entries, friedman, total, geo, other: total - geo, unique: entries.length, words };
    } catch (_) {
      stats = null;
    }
  }
  return { ...s, stats };
}

export function init() {
  return recompute({ input: ui.makeInput(""), focus: "normal", scroll: 0, stats: null });
}

export function update(s, event) {
  if (s.focus === "input") {
    return recompute({ ...s, input: ui.inputHandle(s.input, event) });
  }
  const name = event.type === "char" ? event.char : event.name;
  switch (name) {
    case "i":
    case "enter":
      return { ...s, focus: "input" };
    case "x":
      return recompute({ ...s, input: ui.makeInput(""), scroll: 0 });
    case "down":
      return { ...s, scroll: s.scroll + 1 };
    case "up":
      return { ...s, scroll: Math.max(0, s.scroll - 1) };
    default:
      return s;
  }
}

function report(s) {
  if (!s.stats) return null;
  const st = s.stats;
  const lines = st.entries.map(([k, n]) => `${k} ${n}`);
  return `friedman ${st.friedman.toFixed(4)}  total ${st.total}  unique ${st.unique}\n` + lines.join("\n");
}

export function getCopyText(s) {
  return report(s);
}

export function status(s) {
  if (!s.stats) return { hint: "paste or type text to analyse" };
  return { hint: `friedman ${s.stats.friedman.toFixed(4)} · ${s.stats.total} letters` };
}

export function footer() {
  return "i edit  x clear  ↑↓ scroll  y copy";
}

function barsBox(s, w, rows, style) {
  const lines = [ui.boxTop(w, "frequency")];
  if (!s.stats) {
    lines.push(ui.boxLine(style.on ? style.dim() + "paste or type text to analyse" + style.reset() : "paste or type text to analyse", w));
  } else {
    const bodyRows = rows - 2;
    const inner = w - 4;
    const keyW = 3;
    const numW = 5;
    const barMax = Math.max(1, inner - keyW - 1 - numW - 1);
    const maxN = s.stats.entries.length ? s.stats.entries[0][1] : 1;
    const start = Math.max(0, Math.min(s.scroll, Math.max(0, s.stats.entries.length - bodyRows)));
    for (let i = start; i < s.stats.entries.length; i++) {
      const [k, n] = s.stats.entries[i];
      const barLen = Math.max(1, Math.round((n / maxN) * barMax));
      const line = ui.padEnd(k, keyW) + " " + ui.padEnd(String(n), numW) + " " + "█".repeat(barLen);
      lines.push(ui.boxLine(line, w));
    }
  }
  lines.push(ui.boxBottom(w));
  return ui.frame(lines, w, rows);
}

function statsBox(s, w, rows, style) {
  const lines = [ui.boxTop(w, "stats")];
  if (s.stats) {
    const st = s.stats;
    const interp = st.friedman >= 0.05 ? "~ georgian-like" : "~ uniform-ish";
    const rowsArr = [
      `total     ${st.total}`,
      `unique    ${st.unique}`,
      `georgian  ${st.geo}`,
      `other     ${st.other}`,
      `words     ${st.words}`,
      "",
      `friedman  ${st.friedman.toFixed(4)}`,
      interp,
    ];
    for (const r of rowsArr) lines.push(ui.boxLine(r, w));
  } else {
    lines.push(ui.boxLine("", w));
  }
  lines.push(ui.boxBottom(w));
  void style;
  return ui.frame(lines, w, rows);
}

export function render(s, box, style) {
  const C = box.cols;
  const R = box.rows;
  const lines = [];
  lines.push(ui.boxTop(C, "text", "toolkit"));
  lines.push(ui.boxLineRich(ui.inputRender(s.input, C - 4, style, s.focus === "input"), C));
  lines.push(ui.boxBottom(C));
  lines.push(ui.blank(C));

  const panelRows = R - lines.length;
  const rightW = Math.min(30, Math.max(22, Math.floor(C * 0.36)));
  const leftW = C - rightW - 1;
  const left = barsBox(s, leftW, panelRows, style);
  const right = statsBox(s, rightW, panelRows, style);
  for (let i = 0; i < panelRows; i++) lines.push(left[i] + " " + right[i]);

  return ui.frame(lines, C, R);
}
