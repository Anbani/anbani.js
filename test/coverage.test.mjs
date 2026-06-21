import assert from "assert";
import anbani, { core, utils, toolkit, lorem, data, ab } from "../src/anbani.mjs";

describe("core.convert", function () {
  it("resolves Georgian script aliases", function () {
    assert.strictEqual(core.convert("ანბანი", "მხედრული", "მთავრული"), "ᲐᲜᲑᲐᲜᲘ");
  });

  it("throws on an unsupported source script", function () {
    assert.throws(() => core.convert("abc", "common", "mkhedruli"));
  });

  it("passes through characters not in the alphabet", function () {
    assert.strictEqual(core.convert("ა 1 ბ", "mkhedruli", "asomtavruli"), "Ⴀ 1 Ⴁ");
  });
});

describe("core.interpret", function () {
  it("detects a mkhedruli source", function () {
    assert.strictEqual(core.interpret("ანბანი", "asomtavruli"), "ႠႬႡႠႬႨ");
  });

  it("detects a qwerty source for latin input", function () {
    assert.strictEqual(core.interpret("anbani", "mkhedruli"), "ანბანი");
  });
});

describe("utils", function () {
  it("classifyText distinguishes scripts", function () {
    assert.strictEqual(utils.classifyText("rostevan"), "latin");
    assert.strictEqual(utils.classifyText("привет"), "cyrillic");
    assert.strictEqual(utils.classifyText("ანბანი"), "mkhedruli");
  });

  it("cca / fcc round-trip", function () {
    assert.strictEqual(utils.fcc(utils.cca("ა")), "ა");
  });

  it("isSame compares vectors", function () {
    assert.ok(utils.isSame([1, 2, 3], [1, 2, 3]));
    assert.ok(!utils.isSame([1, 2], [1, 3]));
  });

  it("isBicameral", function () {
    assert.ok(utils.isBicameral("sasataure"));
    assert.ok(!utils.isBicameral("mkhedruli"));
  });

  it("isUnsupported flags cyrillic only", function () {
    assert.ok(utils.isUnsupported("привет"));
    assert.ok(!utils.isUnsupported("ანბანი"));
  });

  it("detectAlphabet", function () {
    assert.strictEqual(utils.detectAlphabet("ანბანი", 5), "mkhedruli");
    assert.strictEqual(utils.detectAlphabet("abc", 2), "qwerty");
  });
});

describe("toolkit", function () {
  it("friedman returns 0 for too-short input", function () {
    assert.strictEqual(toolkit.friedman(""), 0);
    assert.strictEqual(toolkit.friedman("ა"), 0);
  });
});

describe("lorem", function () {
  it("names returns n 'First Last' strings", function () {
    const names = lorem.names(3);
    assert.strictEqual(names.length, 3);
    names.forEach((n) => assert.strictEqual(n.split(" ").length, 2));
  });

  it("paragraphs returns the requested number of paragraphs", function () {
    const p = lorem.paragraphs(5, 3);
    assert.strictEqual(p.trim().split("\n\n").length, 3);
  });

  it("$ exposes random generators", function () {
    assert.strictEqual(typeof lorem.$.randomWord(), "string");
    assert.strictEqual(typeof lorem.$.randomFirstName(), "string");
    assert.strictEqual(typeof lorem.$.randomLastName(), "string");
  });
});

describe("ab and data", function () {
  it("ab.keys lists scripts including bicameral ones", function () {
    assert.ok(ab.keys.includes("mkhedruli"));
    assert.ok(ab.keys.includes("sasataure"));
    assert.ok(ab.keys.includes("braille"));
  });

  it("alphabets are length-aligned", function () {
    const len = data.alphabets.mkhedruli.length;
    assert.strictEqual(data.alphabets.asomtavruli.length, len);
    assert.strictEqual(data.alphabets.braille.length, len);
  });

  it("default export bundles the modules", function () {
    assert.strictEqual(anbani.core, core);
    assert.strictEqual(anbani.ab, ab);
  });
});
