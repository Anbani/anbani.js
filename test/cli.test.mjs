import assert from "assert";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const bin = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "bin",
  "anbani.mjs"
);
const run = (...args) =>
  execFileSync("node", [bin, ...args], { encoding: "utf-8" }).trim();

describe("cli", function () {
  it("convert <text> <from> <to>", function () {
    assert.strictEqual(
      run("convert", "ანბანი", "mkhedruli", "asomtavruli"),
      "ႠႬႡႠႬႨ"
    );
  });

  it("interpret uses mtavruli by default", function () {
    assert.strictEqual(run("interpret", "gamarjoba"), "ᲒᲐᲛᲐᲠᲯᲝᲑᲐ");
  });

  it("legacy shorthand `anbani <text> [to]` interprets", function () {
    assert.strictEqual(run("gamarjoba", "mtavruli"), "ᲒᲐᲛᲐᲠᲯᲝᲑᲐ");
  });

  it("lorem prints a sentence", function () {
    assert.ok(run("lorem", "5").endsWith("."));
  });

  it("an unsupported target exits non-zero", function () {
    assert.throws(() => run("convert", "ა", "mkhedruli", "klingon"));
  });
});
