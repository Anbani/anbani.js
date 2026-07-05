// App shell: chrome (hero / tabs / status / footer), the pure reducer that
// routes events to the active screen, the help overlay, the min-size guard, and
// the runtime event loop. init()/update()/render() are pure and TTY-free for
// tests; run() wires the real terminal.
//
// KEEP IN SYNC WITH anbani.py/anbani/tui/app.py

import core from "../lib/core.mjs";
import lorem from "../lib/lorem.mjs";
import * as ui from "./ui.mjs";
import { detectCaps, makeStyle } from "./style.mjs";
import { makeTerm, CUR_HIDE, moveTo, EL } from "./term.mjs";
import { osc52 } from "./clipboard.mjs";

import * as converter from "./screens/converter.mjs";
import * as alphabet from "./screens/alphabet.mjs";
import * as loremScreen from "./screens/lorem.mjs";
import * as nlp from "./screens/nlp.mjs";
import * as toolkit from "./screens/toolkit.mjs";

export const VERSION = "3.1.0";
const SCREENS = [converter, alphabet, loremScreen, nlp, toolkit];
const BY_ID = Object.fromEntries(SCREENS.map((s) => [s.id, s]));

function mtavruli(title) {
  try {
    return core.convert(title, "mkhedruli", "mtavruli");
  } catch (_) {
    return title;
  }
}

export function initialState() {
  const screens = {};
  for (const s of SCREENS) screens[s.id] = s.init();
  return { tab: "converter", help: false, toast: null, quit: false, size: { cols: 80, rows: 24 }, screens };
}

function setScreen(state, id, scr) {
  return { ...state, screens: { ...state.screens, [id]: scr } };
}

function switchTab(state, id, ctx) {
  let next = { ...state, tab: id, toast: null };
  const screen = BY_ID[id];
  if (screen.onEnterTab) next = setScreen(next, id, screen.onEnterTab(state.screens[id], ctx));
  return next;
}

function applyScreen(state, screen, scr, event, ctx) {
  let ns = screen.update(scr, event, ctx);
  let toast = null;
  if (ns && ns._toast) {
    toast = { text: ns._toast };
    ns = { ...ns };
    delete ns._toast;
  }
  if (ns && ns._copy) {
    const text = ns._copy;
    ns = { ...ns };
    delete ns._copy;
    if (ctx && ctx.copy) ctx.copy(text);
    toast = { text: "copied to clipboard (OSC 52)" };
  }
  return setScreen({ ...state, toast }, state.tab, ns);
}

export function update(state, event, ctx) {
  ctx = ctx || {};
  if (event.type === "resize") return { ...state, size: { cols: event.cols, rows: event.rows } };
  if (event.type === "nlp:loaded") {
    return setScreen(state, "nlp", nlp.onLoaded(state.screens.nlp, ctx));
  }
  if (event.type === "key" && event.name === "ctrl+c") return { ...state, quit: true };
  if (state.help) {
    if (event.type === "key" || event.type === "char") return { ...state, help: false };
    return state;
  }

  const screen = BY_ID[state.tab];
  const scr = state.screens[state.tab];

  if (screen.canInput && scr.focus === "input") {
    if (event.type === "key" && event.name === "escape") {
      return setScreen(state, state.tab, { ...scr, focus: "normal" });
    }
    return applyScreen(state, screen, scr, event, ctx);
  }

  const name = event.type === "char" ? event.char : event.name;
  const idx = SCREENS.findIndex((s) => s.id === state.tab);
  if (name && name.length === 1 && name >= "1" && name <= "5") {
    const i = Number(name) - 1;
    if (i < SCREENS.length) return switchTab(state, SCREENS[i].id, ctx);
  }
  if (name === "tab") return switchTab(state, SCREENS[(idx + 1) % SCREENS.length].id, ctx);
  if (name === "shift+tab") return switchTab(state, SCREENS[(idx - 1 + SCREENS.length) % SCREENS.length].id, ctx);
  if (name === "?") return { ...state, help: true };
  if (name === "q") return { ...state, quit: true };
  if (name === "y") {
    const text = screen.getCopyText ? screen.getCopyText(scr) : null;
    if (text && ctx.copy) ctx.copy(text);
    return { ...state, toast: { text: text ? "copied to clipboard (OSC 52)" : "nothing to copy" } };
  }
  return applyScreen(state, screen, scr, event, ctx);
}

// ---- chrome / render -------------------------------------------------------

function tooSmall(C, R) {
  const lines = [];
  const midA = Math.floor(R / 2) - 1;
  for (let i = 0; i < R; i++) {
    if (i === midA) lines.push(ui.center("Terminal too small", C));
    else if (i === midA + 1) lines.push(ui.center(`need ≥ 60x16 (now ${C}x${R})`, C));
    else lines.push(ui.blank(C));
  }
  return ui.frame(lines, C, R);
}

function statusLine(state, screen, scr, C, style) {
  const st = screen.status ? screen.status(scr) : {};
  let text = "";
  let token = "textMinor";
  if (st.error) {
    text = st.error;
    token = "danger";
  } else if (state.toast) {
    text = state.toast.text;
    token = "warn";
  } else if (st.hint) {
    text = st.hint;
    token = "textMinor";
  }
  const cell = ui.fit(" " + text, C);
  return style.on ? style.fg(token) + cell + style.reset() : cell;
}

function footerLine(screen, scr, C, style) {
  const globalHints = "? help  ↹ tabs  q quit";
  const screenHints = screen.footer ? screen.footer(scr) : "";
  const cell = ui.fit(" " + globalHints + "   " + screenHints, C);
  return style.on ? style.fg("textMinor") + cell + style.reset() : cell;
}

function helpLines(state, C, rows, style) {
  const screen = BY_ID[state.tab];
  const body = [
    "Global",
    "  1–5             switch tabs",
    "  tab / shift+tab  cycle tabs",
    "  ?               toggle this help",
    "  i / enter       edit / select",
    "  y               copy output (OSC 52)",
    "  q   ctrl+c      quit",
    "",
    `Screen: ${screen.label}`,
    "  " + (screen.footer ? screen.footer(state.screens[state.tab]) : ""),
    "",
    "Tip: paste Georgian with your terminal's paste — works in insert mode.",
    "",
    "press any key to close",
  ];
  const lines = [ui.boxTop(C, "help")];
  for (const b of body) lines.push(ui.boxLine(b, C));
  lines.push(ui.boxBottom(C));
  void style;
  return ui.frame(lines, C, rows);
}

export function render(state, size, style) {
  const C = size.cols;
  const R = size.rows;
  if (C < 60 || R < 16) return tooSmall(C, R);
  const screen = BY_ID[state.tab];
  const scr = state.screens[state.tab];
  const hero = ui.hero(mtavruli(screen.title), C, style, `anbani v${VERSION}`);
  const labels = SCREENS.map((s, i) => `${i + 1} ${s.label}`);
  const activeIdx = SCREENS.findIndex((s) => s.id === state.tab);
  const tabsLine = ui.tabs(labels, activeIdx, C, style);
  const contentRows = R - 6;
  const content = state.help
    ? helpLines(state, C, contentRows, style)
    : screen.render(scr, { cols: C, rows: contentRows }, style);
  const all = hero.concat([tabsLine], content, [statusLine(state, screen, scr, C, style)], [footerLine(screen, scr, C, style)]);
  return ui.frame(all, C, R);
}

// ---- splash ----------------------------------------------------------------

// Braille "ANBANI" wordmark shown while the app starts.
export const SPLASH_ART = [
  "⠀⣿⣿⣿⣿⣤⠀⣿⣿⣿⣿⣿⣿⠀⠀⣿⣤⣤⠀⠀⠀⠀⣿⣿⣿⣿⣤⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀",
  "⠀⠀⠀⠀⣿⣿⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⠀⠀⣿⣿⠀",
  "⠀⠀⠀⠀⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀",
  "⣤⣤⠀⠀⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀⣤⣤⠀⠀⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀",
  "⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⠀⣿⣿⠀⠀⣿⣿⠀",
];

// The wordmark screen. `invert` swaps ink/paper (blue-on-white) for the e-ink
// "negative" phase; normally it is white-on-blue with a mustard tagline.
export function splashFrame(size, style, opts = {}) {
  const invert = !!opts.invert;
  const C = size.cols;
  const R = size.rows;
  const bgToken = invert ? "textMajor" : "accent";
  const artFg = invert ? "accent" : "textOnHero";
  const tagFg = invert ? "accent" : "warn";
  const bg = style.on ? style.bg(bgToken) : "";
  const rst = style.on ? style.reset() : "";
  const fill = (plain, fgTok) => (style.on ? bg + (fgTok ? style.fg(fgTok) : "") + plain + rst : plain);

  const body = [];
  const total = SPLASH_ART.length + 2;
  const top = Math.max(0, Math.floor((R - total) / 2));
  for (let i = 0; i < top; i++) body.push(fill(ui.blank(C)));
  for (const line of SPLASH_ART) body.push(fill(ui.center(line, C), artFg));
  body.push(fill(ui.blank(C)));
  body.push(fill(ui.center(`v${VERSION} · loading…`, C), tagFg));
  const frame = [];
  for (let i = 0; i < R; i++) frame.push(i < body.length ? body[i] : fill(ui.blank(C)));
  return ui.frame(frame, C, R);
}

// A flat colour wash — the "flash" phases of an e-ink refresh.
export function solidFrame(size, style, bgToken) {
  const C = size.cols;
  const R = size.rows;
  const line = style.on ? style.bg(bgToken) + " ".repeat(C) + style.reset() : " ".repeat(C);
  const frame = [];
  for (let i = 0; i < R; i++) frame.push(line);
  return ui.frame(frame, C, R);
}

// e-ink page-refresh: one deliberate blink, ghost a negative, then hold ~2s.
export const SPLASH_PHASES = [
  { solid: "textMajor", ms: 140 }, // white flash  ┐ one blink
  { solid: "appBg", ms: 140 },     // black flash  ┘
  { invert: true, ms: 180 },       // ghost negative
  { invert: false, ms: 2000 },     // loading screen (hold ~2s)
];

// ---- runtime loop ----------------------------------------------------------

export async function run(opts = {}) {
  const term = opts.term || makeTerm();
  if (!term.isTTY()) {
    process.stderr.write("error: anbani tui requires an interactive terminal\n");
    return 2;
  }
  const caps = opts.caps || detectCaps({ env: process.env, isTTY: true });
  const style = makeStyle(caps);
  let state = initialState();
  state = { ...state, size: term.size() };

  const ctx = {
    copy: (text) => {
      try {
        term.write(osc52(text, process.env));
      } catch (_) {}
    },
    requestNlpLoad: () => loadNlp(),
    nlp: null,
    lorem,
  };

  const paint = () => {
    const lines = render(state, term.size(), style);
    let frame = CUR_HIDE;
    for (let i = 0; i < lines.length; i++) frame += moveTo(i + 1, 1) + lines[i] + EL;
    term.write(frame);
  };

  async function loadNlp() {
    try {
      const [g, c] = await Promise.all([
        import("../lib/georgianisation.mjs"),
        import("../lib/contractions.mjs"),
      ]);
      ctx.nlp = { georgianisation: g.default || g, contractions: c.default || c };
      state = update(state, { type: "nlp:loaded" }, ctx);
      paint();
    } catch (_) {}
  }

  const writeFrame = (lines) => {
    let frame = CUR_HIDE;
    for (let i = 0; i < lines.length; i++) frame += moveTo(i + 1, 1) + lines[i] + EL;
    term.write(frame);
  };
  const drawPhase = (ph) => {
    const size = term.size();
    writeFrame(ph.solid ? solidFrame(size, style, ph.solid) : splashFrame(size, style, { invert: ph.invert }));
  };

  return await new Promise((resolve) => {
    const quit = (code) => {
      term.stop();
      resolve(code);
    };

    const startApp = () => {
      term.onKey((ev) => {
        state = update(state, ev, ctx);
        if (state.quit) return quit(0);
        paint();
      });
      term.onPaste((text) => {
        state = update(state, { type: "paste", text }, ctx);
        paint();
      });
      term.onResize(() => {
        const sz = term.size();
        state = update(state, { type: "resize", cols: sz.cols, rows: sz.rows }, ctx);
        paint();
      });
      paint();
    };

    let done = false;
    let timer = null;
    const finish = () => {
      if (done) return;
      done = true;
      if (timer) clearTimeout(timer);
      startApp();
    };

    // e-ink refresh phases; any key skips straight to the app
    let idx = 0;
    const tick = () => {
      if (done) return;
      if (idx >= SPLASH_PHASES.length) return finish();
      const ph = SPLASH_PHASES[idx++];
      drawPhase(ph);
      timer = setTimeout(tick, ph.ms);
    };
    term.onKey(() => finish());
    term.onPaste(() => {});
    term.onResize(() => {
      if (!done && idx > 0) drawPhase(SPLASH_PHASES[idx - 1]);
    });
    term.start();
    tick();
  });
}

export const _screens = { converter, alphabet, lorem: loremScreen, nlp, toolkit };
