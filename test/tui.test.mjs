import assert from "assert";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as app from "../src/tui/app.mjs";
import { makeStyle } from "../src/tui/style.mjs";
import { width } from "../src/tui/ui.mjs";
import g from "../src/lib/georgianisation.mjs";
import c from "../src/lib/contractions.mjs";

// KEEP IN SYNC WITH anbani.py/tests/test_tui.py

const styleOff = makeStyle({ colors: "none" });
const SIZE = { cols: 80, rows: 24 };
const K = (name) => ({ type: "key", name });
const CH = (ch) => ({ type: "char", char: ch });
const type = (s) => [...s].map(CH);

function feed(state, events, ctx) {
  for (const e of events) state = app.update(state, e, ctx || {});
  return state;
}

function frameOf(state, size) {
  return app.render(state, size || SIZE, styleOff);
}

describe("tui app: chrome invariants", function () {
  it("every frame is exactly rows lines of cols columns", function () {
    let base = app.initialState();
    const states = [];
    // one state per tab
    for (const tab of ["converter", "alphabet", "lorem", "nlp", "toolkit"]) {
      states.push(feed(base, [CH(tab === "converter" ? "1" : tab === "alphabet" ? "2" : tab === "lorem" ? "3" : tab === "nlp" ? "4" : "5")]));
    }
    states.push(feed(base, [CH("?")])); // help overlay
    states.push(base);
    for (const st of states) {
      for (const size of [SIZE, { cols: 100, rows: 30 }, { cols: 62, rows: 18 }]) {
        const lines = frameOf(st, size);
        assert.strictEqual(lines.length, size.rows);
        for (const l of lines) assert.strictEqual(width(l), size.cols, `line width != ${size.cols}: ${JSON.stringify(l)}`);
      }
    }
  });

  it("min-size guard shows a notice", function () {
    const lines = frameOf(app.initialState(), { cols: 50, rows: 10 });
    assert.ok(lines.join("\n").includes("Terminal too small"));
  });

  it("help toggles and any key closes", function () {
    let s = feed(app.initialState(), [CH("?")]);
    assert.strictEqual(s.help, true);
    s = feed(s, [CH("x")]);
    assert.strictEqual(s.help, false);
  });

  it("tab wraps with shift+tab", function () {
    const s = feed(app.initialState(), [K("shift+tab")]);
    assert.strictEqual(s.tab, "toolkit");
  });

  it("ctrl+c quits even in insert mode; q types 'q' in insert mode", function () {
    let s = feed(app.initialState(), [CH("i")]); // focus converter input
    assert.strictEqual(s.screens.converter.focus, "input");
    const typed = feed(s, [CH("q")]);
    assert.notStrictEqual(typed.quit, true); // q typed, not a quit
    assert.strictEqual(typed.screens.converter.input.text, "q");
    const quit = feed(s, [K("ctrl+c")]);
    assert.strictEqual(quit.quit, true);
  });
});

describe("tui converter", function () {
  it("auto-converts typed qwerty and shows detected script", function () {
    let s = feed(app.initialState(), [CH("i"), ...type("gamarjoba"), K("escape")]);
    assert.strictEqual(s.screens.converter.output, "ᲒᲐᲛᲐᲠᲯᲝᲑᲐ");
    assert.strictEqual(s.screens.converter.detected, "latin");
    assert.ok(frameOf(s).join("\n").includes("ᲒᲐᲛᲐᲠᲯᲝᲑᲐ"));
  });

  it("undetectable input surfaces an error, app survives", function () {
    let s = feed(app.initialState(), [CH("i"), ...type("!!!")]);
    assert.ok(s.screens.converter.error);
    s = feed(s, [K("escape"), CH("2")]); // keep operating
    assert.strictEqual(s.tab, "alphabet");
  });

  it("swap on a non-source target toasts and does not change state", function () {
    // manual mode, then cycle `to` to a non-source target (homoglyph)
    let s = feed(app.initialState(), [CH("m"), CH("o"), CH("o"), CH("o")]);
    assert.strictEqual(s.screens.converter.to, "homoglyph");
    const before = { from: s.screens.converter.from, to: s.screens.converter.to };
    s = feed(s, [CH("s")]);
    assert.ok(s.toast && /cannot swap/.test(s.toast.text));
    assert.deepStrictEqual({ from: s.screens.converter.from, to: s.screens.converter.to }, before);
  });

  it("swap on a valid source target succeeds", function () {
    // to=nuskhuri (a source) via two `o` cycles from mtavruli
    let s = feed(app.initialState(), [CH("m"), CH("o"), CH("o")]);
    assert.strictEqual(s.screens.converter.to, "nuskhuri");
    s = feed(s, [CH("s")]);
    assert.strictEqual(s.screens.converter.from, "nuskhuri");
    assert.strictEqual(s.screens.converter.to, "mkhedruli");
  });
});

describe("tui alphabet", function () {
  it("navigation, detail card, archaic toggle, copy", function () {
    const copied = [];
    const ctx = { copy: (t) => copied.push(t) };
    let s = feed(app.initialState(), [CH("2"), CH("l"), CH("l"), CH("l")], ctx);
    assert.strictEqual(s.screens.alphabet.cursor, 3);
    const f = frameOf(s).join("\n");
    for (const token of ["დონ", "Ⴃ", "⠙", "4"]) assert.ok(f.includes(token), `detail missing ${token}`);
    s = feed(s, [CH("a")], ctx);
    assert.strictEqual(s.screens.alphabet.archaic, true);
    assert.strictEqual(s.screens.alphabet.cursor, 3);
    s = feed(s, [K("enter")], ctx);
    assert.deepStrictEqual(copied, ["დ"]);
  });
});

describe("tui lorem", function () {
  it("generates on demand, cycles kind, clamps bounds", function () {
    const fake = {
      sentences: (n) => "სიტყვა ".repeat(n).trim() + ".",
      paragraphs: (w, p) => (("სიტყვა ".repeat(w).trim() + ".\n\n").repeat(p)).trim(),
      names: (n) => Array.from({ length: n }, () => "სახელი გვარი"),
    };
    const ctx = { lorem: fake };
    let s = feed(app.initialState(), [CH("3"), CH("g")], ctx);
    assert.ok(s.screens.lorem.output.length > 0);
    s = feed(s, [CH("k")], ctx);
    assert.strictEqual(s.screens.lorem.kind, "paragraphs");
    // clamp words down to 1
    s = feed(app.initialState(), [CH("3")], ctx);
    s = feed(s, Array.from({ length: 30 }, () => CH("-")), ctx);
    assert.strictEqual(s.screens.lorem.words, 1);
  });
});

describe("tui nlp", function () {
  it("lazy-loads once, computes, and never exposes accurate on JS", function () {
    let loads = 0;
    const ctx = { requestNlpLoad: () => (loads += 1) };
    let s = feed(app.initialState(), [CH("4")], ctx);
    assert.strictEqual(loads, 1);
    assert.strictEqual(s.screens.nlp.loading, true);
    // revisit does not reload
    s = feed(s, [CH("1"), CH("4")], ctx);
    assert.strictEqual(loads, 1);
    // simulate load complete
    ctx.nlp = { georgianisation: g, contractions: c };
    s = app.update(s, { type: "nlp:loaded" }, ctx);
    assert.strictEqual(s.screens.nlp.loaded, true);
    s = feed(s, [CH("i"), ...type("gamarjoba")], ctx);
    assert.ok(/[ა-ჰ]/.test(s.screens.nlp.output));
    // gmode cycling stays within fast/balanced
    s = feed(s, [K("escape")], ctx);
    for (let i = 0; i < 6; i++) {
      s = feed(s, [CH("b")], ctx);
      assert.notStrictEqual(s.screens.nlp.gmode, "accurate");
    }
  });
});

describe("tui toolkit", function () {
  it("frequency bars sorted, friedman + counts", function () {
    let s = feed(app.initialState(), [CH("5"), CH("i"), ...type("აააბბგ")]);
    const st = s.screens.toolkit.stats;
    assert.strictEqual(st.total, 6);
    assert.strictEqual(st.unique, 3);
    assert.strictEqual(st.entries[0][1], 3);
    assert.strictEqual(st.entries[1][1], 2);
    assert.strictEqual(st.entries[2][1], 1);
    assert.ok(/\d\.\d{4}/.test(frameOf(s).join("\n")));
  });
});

describe("tui splash (e-ink refresh)", function () {
  it("wordmark, negative, and solid flashes all fill the screen", function () {
    for (const size of [SIZE, { cols: 100, rows: 30 }, { cols: 62, rows: 18 }]) {
      const frames = [
        app.splashFrame(size, styleOff),
        app.splashFrame(size, styleOff, { invert: true }),
        app.solidFrame(size, styleOff, "textMajor"),
        app.solidFrame(size, styleOff, "appBg"),
      ];
      for (const lines of frames) {
        assert.strictEqual(lines.length, size.rows);
        for (const l of lines) assert.strictEqual(width(l), size.cols);
      }
    }
    assert.ok(app.splashFrame(SIZE, styleOff).join("\n").includes("loading…"));
    assert.ok(app.SPLASH_PHASES.length >= 4);
  });
});

describe("tui packaging guard", function () {
  it("browser entry does not import the TUI", function () {
    const dir = path.dirname(fileURLToPath(import.meta.url));
    const src = fs.readFileSync(path.join(dir, "..", "src", "anbani.mjs"), "utf8");
    assert.ok(!src.includes("tui"), "src/anbani.mjs must not reference tui");
  });
});
