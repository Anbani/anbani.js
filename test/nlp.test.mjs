import assert from "assert";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import anbani from "../src/anbani.mjs";

const { contractions, georgianisation, preprocessing } = anbani.nlp;

describe("nlp.contractions", function () {
  // Expected values ported from anbani.py/tests/test_contractions.py.
  it("cmap loaded from CSV", function () {
    assert.strictEqual(contractions.cmap["ა. შ."], "ასე შემდეგ");
    assert.ok(Object.keys(contractions.cmap).length > 300);
  });

  it("expand / contract single keys", function () {
    assert.strictEqual(contractions.expand("ა. შ."), "ასე შემდეგ");
    assert.strictEqual(contractions.contract("ასე შემდეგ"), "ა.შ.");
    assert.strictEqual(contractions.expand("არააბრევიატურა"), "არააბრევიატურა");
  });

  it("expandText / contractText in prose", function () {
    assert.strictEqual(
      contractions.expandText("ვნახოთ ა. შ."),
      "ვნახოთ ასე შემდეგ"
    );
    assert.strictEqual(
      contractions.contractText("ვნახოთ ასე შემდეგ"),
      "ვნახოთ ა.შ."
    );
  });

  it("respects Georgian word boundaries", function () {
    assert.strictEqual(contractions.expandText("ჰაერი"), "ჰაერი");
    assert.strictEqual(
      contractions.expandText("100 ჰა მიწა"),
      "100 ჰექტარი მიწა"
    );
    assert.strictEqual(
      contractions.contractText("თავისუფალი ქვეყანა"),
      "თავისუფალი ქვეყანა"
    );
  });

  it("single pass — insertions are not re-scanned", function () {
    // Full invariant, mirroring the py suite: every expansion contracts back
    // to exactly its contraction (no chained second-pass replacement).
    for (const [expansion, contraction] of Object.entries(contractions.emap)) {
      assert.strictEqual(contractions.contractText(expansion), contraction);
    }
    for (const [contraction, expansion] of Object.entries(contractions.cmap)) {
      assert.strictEqual(contractions.expandText(contraction), expansion);
    }
  });
});

describe("nlp.georgianisation", function () {
  // Expected values ported from anbani.py/tests/test_georgianisation.py.
  it("fast mode — letters and diphthongs", function () {
    assert.strictEqual(georgianisation.georgianiseFast("gamarjoba"), "გამარჯობა");
    assert.strictEqual(georgianisation.georgianiseFast("sha"), "შა");
    assert.strictEqual(georgianisation.georgianiseFast("cha"), "ჩა");
    assert.strictEqual(georgianisation.georgianiseFast("dzma"), "ძმა");
  });

  it("mode dispatch", function () {
    assert.strictEqual(georgianisation.georgianise("gamarjoba", "fast"), "გამარჯობა");
    // Balanced uses the ambigram table; just assert it runs and stays a string.
    assert.strictEqual(typeof georgianisation.georgianise("gamarjoba", "balanced"), "string");
    assert.strictEqual(typeof georgianisation.georgianise("gamarjoba"), "string"); // default balanced
  });

  it("accurate mode throws (Python-only table)", function () {
    assert.throws(() => georgianisation.georgianise("gamarjoba", "accurate"), /Python-only/);
  });

  it("latinise round-trips a simple word", function () {
    assert.strictEqual(georgianisation.latinise("გამარჯობა"), "gamarjoba");
  });
});

describe("nlp.preprocessing", function () {
  // Expected values ported from anbani.py/tests/test_preprocessing.py.
  it("wordTokenize strips non-Georgian and lowercases Mtavruli", function () {
    assert.deepStrictEqual(preprocessing.wordTokenize("გამარჯობა, მსოფლიო!"), [
      "გამარჯობა",
      "მსოფლიო",
    ]);
    assert.deepStrictEqual(preprocessing.wordTokenize("ᲒᲐᲛᲐᲠᲯᲝᲑᲐ"), ["გამარჯობა"]);
  });

  it("sentenceTokenize nests and normalises ? !", function () {
    assert.deepStrictEqual(preprocessing.sentenceTokenize("გ ა. ბ გ."), [
      ["გ", "ა"],
      ["ბ", "გ"],
    ]);
    assert.deepStrictEqual(preprocessing.sentenceTokenize("ა ბ! გ დ?"), [
      ["ა", "ბ"],
      ["გ", "დ"],
    ]);
  });

  it("paragraphTokenize splits on newline", function () {
    assert.deepStrictEqual(preprocessing.paragraphTokenize("გ ა\nბ გ"), [
      ["გ", "ა"],
      ["ბ", "გ"],
    ]);
  });

  it("cleanup collapses whitespace, keeps punctuation", function () {
    assert.strictEqual(preprocessing.cleanup("გ,  ა!"), "გ, ა!");
  });
});

describe("nlp UMD bundle", function () {
  // The ~400KB ambigram table must NOT be bundled into dist/anbani.js. CI
  // rebuilds the bundle before tests, so these tokens (unique to that CSV's
  // header) appearing would mean the exclusion regressed.
  it("does not embed the ambigram table", function () {
    const bundle = readFileSync(
      fileURLToPath(new URL("../dist/anbani.js", import.meta.url)),
      "utf-8"
    );
    assert.ok(!bundle.includes("NCOUNT"), "ambigram CSV header leaked into bundle");
    assert.ok(!bundle.includes("IMPORTANCE"), "ambigram CSV header leaked into bundle");
  });
});
