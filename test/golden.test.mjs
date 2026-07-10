import assert from "assert";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import anbani from "../src/anbani.mjs";

// Shared cross-language parity vectors — byte-identical to anbani.py/spec/golden.json.
const golden = JSON.parse(
  readFileSync(fileURLToPath(new URL("../spec/golden.json", import.meta.url)), "utf-8")
);
const TOL = golden.float_tolerance;

// id -> language-native call (camelCase here, snake_case in the py consumer).
const registry = {
  "core.convert": (a) => anbani.core.convert(...a),
  "core.interpret": (a) => anbani.core.interpret(...a),
  "core.classify": (a) => anbani.core.classify(...a),
  "nlp.expand": (a) => anbani.nlp.contractions.expand(...a),
  "nlp.expand_text": (a) => anbani.nlp.contractions.expandText(...a),
  "nlp.contract": (a) => anbani.nlp.contractions.contract(...a),
  "nlp.contract_text": (a) => anbani.nlp.contractions.contractText(...a),
  "nlp.georgianise": (a) => anbani.nlp.georgianisation.georgianise(...a),
  "nlp.latinise": (a) => anbani.nlp.georgianisation.latinise(...a),
  "nlp.word_tokenize": (a) => anbani.nlp.preprocessing.wordTokenize(...a),
  "nlp.sentence_tokenize": (a) => anbani.nlp.preprocessing.sentenceTokenize(...a),
  "nlp.paragraph_tokenize": (a) => anbani.nlp.preprocessing.paragraphTokenize(...a),
  "nlp.cleanup": (a) => anbani.nlp.preprocessing.cleanup(...a),
  "toolkit.count": (a) => anbani.toolkit.count(...a),
  "toolkit.frequency": (a) => anbani.toolkit.frequency(...a),
  "toolkit.friedman": (a) => anbani.toolkit.friedman(...a),
};

const almostEqual = (a, b) => {
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) <= TOL;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((x, i) => almostEqual(x, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    return ka.length === kb.length && ka.every((k) => almostEqual(a[k], b[k]));
  }
  return a === b;
};

describe("golden vectors (spec/golden.json)", function () {
  it("every vector id is registered", function () {
    for (const v of golden.vectors) {
      assert.ok(registry[v.id], `unregistered id: ${v.id}`);
    }
  });

  golden.vectors.forEach((v, i) => {
    const label = `${i} ${v.id} — ${v.note ?? JSON.stringify(v.args)}`;
    it(label, function () {
      const fn = registry[v.id];
      if (v.raises) {
        assert.throws(() => fn(v.args), label);
      } else {
        const got = fn(v.args);
        assert.ok(
          almostEqual(got, v.expect),
          `${label}\n  got:    ${JSON.stringify(got)}\n  expect: ${JSON.stringify(v.expect)}`
        );
      }
    });
  });
});
