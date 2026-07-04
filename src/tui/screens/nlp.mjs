// NLP lab screen: georgianise / latinise / expand / contract. The NLP modules
// are heavy, so they load lazily the first time this tab opens (app wires the
// dynamic import and dispatches an "nlp:loaded" event). gmode has no "accurate"
// on JS (Python-only) — that is the one sanctioned cross-language difference.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/screens/nlp.py

import * as ui from "../ui.mjs";

export const id = "nlp";
export const label = "NLP";
export const title = "ენის ლაბი";
export const canInput = true;

const MODES = ["georgianise", "latinise", "expand", "contract"];
const GMODES = ["fast", "balanced"]; // JS: no "accurate"

export function init() {
  return {
    mode: "georgianise",
    gmode: "balanced",
    input: ui.makeInput(""),
    output: "",
    error: null,
    loaded: false,
    loading: false,
    focus: "normal",
  };
}

function recompute(s, ctx) {
  const text = s.input.text;
  if (!s.loaded || !ctx || !ctx.nlp) return { ...s, output: "", error: null };
  let output = "";
  let error = null;
  if (text) {
    try {
      const g = ctx.nlp.georgianisation;
      const c = ctx.nlp.contractions;
      if (s.mode === "georgianise") output = g.georgianise(text, s.gmode);
      else if (s.mode === "latinise") output = g.latinise(text);
      else if (s.mode === "expand") output = c.expandText(text);
      else output = c.contractText(text);
    } catch (e) {
      error = e && e.message ? e.message : String(e);
      output = "";
    }
  }
  return { ...s, output, error };
}

// Called by the app when this tab becomes active.
export function onEnterTab(s, ctx) {
  if (s.loaded || s.loading) return s;
  if (ctx && ctx.requestNlpLoad) ctx.requestNlpLoad();
  return { ...s, loading: true };
}

// Called by the app after the NLP modules finish loading (ctx.nlp is set).
export function onLoaded(s, ctx) {
  return recompute({ ...s, loaded: true, loading: false }, ctx);
}

export function update(s, event, ctx) {
  if (s.focus === "input") {
    return recompute({ ...s, input: ui.inputHandle(s.input, event) }, ctx);
  }
  const name = event.type === "char" ? event.char : event.name;
  switch (name) {
    case "i":
    case "enter":
      return { ...s, focus: "input" };
    case "m":
      return recompute({ ...s, mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] }, ctx);
    case "M":
      return recompute({ ...s, mode: MODES[(MODES.indexOf(s.mode) - 1 + MODES.length) % MODES.length] }, ctx);
    case "b":
      if (s.mode !== "georgianise") return s;
      return recompute({ ...s, gmode: GMODES[(GMODES.indexOf(s.gmode) + 1) % GMODES.length] }, ctx);
    case "x":
      return recompute({ ...s, input: ui.makeInput("") }, ctx);
    default:
      return s;
  }
}

export function getCopyText(s) {
  return s.output || null;
}

export function status(s) {
  if (s.error) return { error: `error: ${s.error}` };
  if (s.loading && !s.loaded) return { hint: "loading nlp…" };
  return { hint: s.mode === "georgianise" ? `${s.mode} · ${s.gmode}` : s.mode };
}

export function footer() {
  return "i edit  m mode  b gmode  x clear  y copy";
}

export function render(s, box, style) {
  const C = box.cols;
  const R = box.rows;
  const lines = [];
  lines.push(ui.tabs(MODES, MODES.indexOf(s.mode), C, style));
  if (s.mode === "georgianise") {
    lines.push("gmode:  " + GMODES.map((g) => ui.pill(g, g === s.gmode, style)).join(""));
  } else {
    lines.push(ui.blank(C));
  }
  lines.push(ui.blank(C));
  lines.push(ui.boxTop(C, "input"));
  lines.push(ui.boxLineRich(ui.inputRender(s.input, C - 4, style, s.focus === "input"), C));
  lines.push(ui.boxBottom(C));
  lines.push(ui.blank(C));

  const header = lines.length;
  const bodyRows = Math.max(1, R - header - 2);
  if (s.loading && !s.loaded) {
    const co = ui.callout(["loading nlp…"], C, style);
    for (const l of co) lines.push(l);
  } else {
    const body = [];
    if (!s.input.text) {
      body.push(style.on ? style.dim() + "type text…" + style.reset() : "type text…");
    } else {
      for (const l of ui.wrapText(s.output, C - 4)) body.push(l);
    }
    while (body.length < bodyRows) body.push("");
    lines.push(ui.boxTop(C, "output"));
    for (let i = 0; i < bodyRows; i++) lines.push(ui.boxLine(body[i] || "", C));
    lines.push(ui.boxBottom(C));
  }

  return ui.frame(lines, C, R);
}
