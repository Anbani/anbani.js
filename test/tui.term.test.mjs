import assert from "assert";
import { parseKeys, makeParserState, flushEscape } from "../src/tui/keys.mjs";
import { width } from "../src/tui/ui.mjs";
import { osc52 } from "../src/tui/clipboard.mjs";

// KEEP IN SYNC WITH anbani.py/tests/test_tui_term.py

const feed = (bytes, state) => parseKeys(Buffer.from(bytes), state || makeParserState());

describe("tui key parser", function () {
  it("plain ASCII char", function () {
    assert.deepStrictEqual(feed([0x61]).events, [{ type: "char", char: "a" }]);
  });

  it("enter / tab / backspace variants", function () {
    assert.strictEqual(feed([0x0d]).events[0].name, "enter");
    assert.strictEqual(feed([0x0a]).events[0].name, "enter");
    assert.strictEqual(feed([0x09]).events[0].name, "tab");
    assert.strictEqual(feed([0x7f]).events[0].name, "backspace");
    assert.strictEqual(feed([0x08]).events[0].name, "backspace");
  });

  it("ctrl combos", function () {
    assert.strictEqual(feed([0x03]).events[0].name, "ctrl+c");
    assert.strictEqual(feed([0x04]).events[0].name, "ctrl+d");
    assert.strictEqual(feed([0x15]).events[0].name, "ctrl+u");
    assert.strictEqual(feed([0x17]).events[0].name, "ctrl+w");
    assert.strictEqual(feed([0x0b]).events[0].name, "ctrl+k");
  });

  it("arrows / nav via CSI", function () {
    assert.strictEqual(feed([0x1b, 0x5b, 0x41]).events[0].name, "up");
    assert.strictEqual(feed([0x1b, 0x5b, 0x42]).events[0].name, "down");
    assert.strictEqual(feed([0x1b, 0x5b, 0x43]).events[0].name, "right");
    assert.strictEqual(feed([0x1b, 0x5b, 0x44]).events[0].name, "left");
    assert.strictEqual(feed([0x1b, 0x5b, 0x5a]).events[0].name, "shift+tab");
    assert.strictEqual(feed([0x1b, 0x5b, 0x48]).events[0].name, "home");
    assert.strictEqual(feed([0x1b, 0x5b, 0x46]).events[0].name, "end");
    assert.strictEqual(feed([0x1b, 0x5b, 0x33, 0x7e]).events[0].name, "delete");
    assert.strictEqual(feed([0x1b, 0x5b, 0x35, 0x7e]).events[0].name, "pageup");
    assert.strictEqual(feed([0x1b, 0x5b, 0x36, 0x7e]).events[0].name, "pagedown");
  });

  it("SS3 arrows", function () {
    assert.strictEqual(feed([0x1b, 0x4f, 0x41]).events[0].name, "up");
    assert.strictEqual(feed([0x1b, 0x4f, 0x46]).events[0].name, "end");
  });

  it("UTF-8 Georgian codepoint", function () {
    assert.deepStrictEqual(feed([0xe1, 0x83, 0x94]).events, [{ type: "char", char: "ე" }]);
  });

  it("UTF-8 split across chunks", function () {
    const st = makeParserState();
    const a = parseKeys(Buffer.from([0xe1]), st);
    assert.deepStrictEqual(a.events, []);
    const b = parseKeys(Buffer.from([0x83, 0x94]), st);
    assert.deepStrictEqual(b.events, [{ type: "char", char: "ე" }]);
  });

  it("bracketed paste, incl. split across chunks", function () {
    const start = [0x1b, 0x5b, 0x32, 0x30, 0x30, 0x7e];
    const end = [0x1b, 0x5b, 0x32, 0x30, 0x31, 0x7e];
    const body = [...Buffer.from("აბ", "utf8")];
    const st = makeParserState();
    parseKeys(Buffer.from([...start, ...body]), st);
    const r = parseKeys(Buffer.from(end), st);
    assert.deepStrictEqual(r.events, [{ type: "paste", text: "აბ" }]);
  });

  it("lone ESC flushes to escape via timer seam", function () {
    const st = makeParserState();
    const a = parseKeys(Buffer.from([0x1b]), st);
    assert.deepStrictEqual(a.events, []);
    assert.strictEqual(st.mode, "ESC");
    const f = flushEscape(st);
    assert.strictEqual(f.events[0].name, "escape");
  });

  it("ESC then a non-CSI byte yields escape + char", function () {
    const r = feed([0x1b, 0x78]);
    assert.strictEqual(r.events[0].name, "escape");
    assert.deepStrictEqual(r.events[1], { type: "char", char: "x" });
  });
});

describe("tui display width", function () {
  it("Georgian scripts are width 1", function () {
    for (const ch of ["ა", "Ა", "Ⴀ", "ⴀ"]) assert.strictEqual(width(ch), 1);
  });
  it("combining marks are zero width", function () {
    assert.strictEqual(width("ა̈"), 1); // Svan a-umlaut
    assert.strictEqual(width("t͡ʃ"), 2); // IPA with combining tie U+0361
  });
  it("East-Asian wide + emoji are width 2", function () {
    assert.strictEqual(width("漢"), 2);
    assert.strictEqual(width("😀"), 2);
  });
  it("SGR codes do not count", function () {
    assert.strictEqual(width("\x1b[31mab\x1b[0m"), 2);
  });
});

describe("tui osc52", function () {
  it("builds the copy sequence", function () {
    assert.strictEqual(osc52("აბ"), "\x1b]52;c;4YOQ4YOR\x07");
  });
  it("wraps for tmux by doubling ESC", function () {
    const s = osc52("x", { TMUX: "1" });
    assert.ok(s.startsWith("\x1bPtmux;"));
    assert.ok(s.endsWith("\x1b\\"));
    assert.ok(s.includes("\x1b\x1b]52;c;"));
  });
});
