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

  it("no-arg over a pipe still prints usage (non-TTY)", function () {
    assert.ok(run().startsWith("Usage:"));
  });

  it("help lists the tui command", function () {
    assert.ok(run("help").includes("tui"));
  });

  it("`tui` over a pipe refuses with a clear error", function () {
    let threw = false;
    try {
      execFileSync("node", [bin, "tui"], { encoding: "utf-8" });
    } catch (e) {
      threw = true;
      assert.ok(String(e.stderr).includes("interactive terminal"));
    }
    assert.ok(threw, "expected `tui` to exit non-zero over a pipe");
  });
});
