import assert from "assert";
import anbani, { core } from "../src/anbani.mjs";
import anbaniUMD from "../dist/anbani.js";

// Regression guard for the /slack outage: core.$ once had a dual identity —
// a function in core.mjs's own default, an object after anbani.mjs mutated it —
// so core.$(text) threw for consumers while core.$.classifyText(text) worked.
// The classifier is now a single callable-with-property, and both call styles
// (plus the blessed core.classify name) must work from ESM and the UMD bundle.
function assertClassifierShape(label, c) {
  describe(label, function () {
    it("core.$ is callable and classifies", function () {
      assert.strictEqual(typeof c.$, "function");
      assert.strictEqual(c.$("ანბანი"), "mkhedruli");
    });

    it("core.$.classifyText still works (3.0 back-compat)", function () {
      assert.strictEqual(typeof c.$.classifyText, "function");
      assert.strictEqual(c.$.classifyText("ანბანი"), "mkhedruli");
    });

    it("core.classify is the same identity as core.$", function () {
      assert.strictEqual(c.classify, c.$);
      assert.strictEqual(c.classify("ᲐᲜᲑᲐᲜᲘ"), "mtavruli");
    });

    it("interpret throws on undetectable input", function () {
      assert.throws(() => c.interpret(null, "mtavruli"));
      assert.throws(() => c.interpret(undefined, "mtavruli"));
      assert.throws(() => c.interpret("12345", "mtavruli"));
    });
  });
}

describe("classifier API shape", function () {
  assertClassifierShape("ESM (src)", core);
  assertClassifierShape("UMD (dist)", anbaniUMD.core);

  it("named and default ESM exports share the classifier", function () {
    assert.strictEqual(anbani.core.classify, core.classify);
  });
});
