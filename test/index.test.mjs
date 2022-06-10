import assert from "assert";
import anbani from "../src/anbani.mjs";
import anbaniUMD from "../dist/anbani.js";

describe("ESM module testing", function () {
  describe("anbani.core", function () {
    it("should be able to transcribe from mkhedruli to asomtavruli", function () {
      assert.strictEqual(
        anbani.core.convert("იყო არაბეთს როსტევან", "mkhedruli", "asomtavruli"),
        "ႨႷႭ ႠႰႠႡႤႧႱ ႰႭႱႲႤႥႠႬ"
      );
    });

    it("should be able to interpret things in mkhedruli", function () {
      assert.strictEqual(
        anbani.core.interpret("iyo arabeTs rostevan", "mkhedruli"),
        "იყო არაბეთს როსტევან"
      );
    });

    it("should be able to classify mkhedruli", function () {
      assert.strictEqual(anbani.core.$.classifyText("როსტევან"), "mkhedruli");
    });
  });
  describe("anbani.ab", function () {
    it("[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶჷჸჹჺ჻ჼჽჾჿა̈ა̄ა̄̈ე̄ი̄ო̈ო̄ო̄̈უ̈უ̄უ̄̈უ̂ჷ̄]", function () {
      assert.strictEqual(
        anbani.ab.letters.mkhedruli,
        "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶჷჸჹჺ჻ჼჽჾჿა̈ა̄ა̄̈ე̄ი̄ო̈ო̄ო̄̈უ̈უ̄უ̄̈უ̂ჷ̄"
      );
    });

    it("[ⴀⴁⴂⴃⴄⴅⴆⴇⴈⴉⴊⴋⴌⴍⴎⴏⴐⴑⴒⴓⴔⴕⴖⴗⴘⴙⴚⴛⴜⴝⴞⴟⴠⴡⴢⴣⴤⴥ]", function () {
      assert.strictEqual(
        anbani.ab.letters.nuskhuri,
        "ⴀⴁⴂⴃⴄⴅⴆⴇⴈⴉⴊⴋⴌⴍⴎⴏⴐⴑⴒⴓⴔⴕⴖⴗⴘⴙⴚⴛⴜⴝⴞⴟⴠⴡⴢⴣⴤⴥ"
      );
    });

    it("[ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿჀჁჂჃჄჅ]", function () {
      assert.strictEqual(
        anbani.ab.letters.asomtavruli,
        "ႠႡႢႣႤႥႦႧႨႩႪႫႬႭႮႯႰႱႲႳႴႵႶႷႸႹႺႻႼႽႾႿჀჁჂჃჄჅ"
      );
    });



    it("[ᲐᲑᲒᲓᲔᲕᲖᲗᲘᲙᲚᲛᲜᲝᲞᲟᲠᲡᲢᲣᲤᲥᲦᲧᲨᲩᲪᲫᲬᲭᲮᲯᲰᲱᲲᲳᲴᲵᲶᲷᲸᲹᲺᲽᲾᲿ]", function () {
      assert.strictEqual(
        anbani.ab.letters.mtavruli,
        "ᲐᲑᲒᲓᲔᲕᲖᲗᲘᲙᲚᲛᲜᲝᲞᲟᲠᲡᲢᲣᲤᲥᲦᲧᲨᲩᲪᲫᲬᲭᲮᲯᲰᲱᲲᲳᲴᲵᲶᲷᲸᲹᲺᲽᲾᲿ"
      );
    });

    it("should convert to caps", function () {
      assert.strictEqual(
        anbani.ab.caps("ანბანი"),
        "ᲐᲜᲑᲐᲜᲘ"
      );
    });

    it("should convert to bicam", function () {
      assert.strictEqual(
        anbani.ab.bicam("ქართული ა'ნბანი"),
        "Ⴕართული Ⴀნბანი"
      );
    });

    it("should convert to bicaps", function () {
      assert.strictEqual(
        anbani.ab.bicaps("ქართული ა'ნბანი"),
        "ႵᲐᲠᲗᲣᲚᲘ ႠᲜᲑᲐᲜᲘ"
      );
    });
  });

  describe("anbani.lorem", function () {
    it("should be able to be generate random sentences", function () {
      let n = 7;
      assert.strictEqual(anbani.lorem.sentences(n).split(" ").length, n);
    });

    it("should be able to be generate custom wordlist random sentences", function () {
      anbani.lorem.loadWordlist([
        "კაპიკი",
        "გაკაპიკებულა",
        "საკაპიკეში",
        "ჩაკაპიკებულა",
      ]);
      let n = 7;
      assert.strictEqual(anbani.lorem.sentences(n).split(" ").length, n);
    });
  });

  describe("anbani.toolkit", function () {
    it("should be able to be correctly count letter incidences", function () {
      let text = "იყო არაბეთს როსტევან მეფე ღმრთისაგან სვიანი";
      assert.strictEqual(anbani.toolkit.count(text)["Ი"], 4);
    });

    it("should be able to be correctly compute letter frequencies", function () {
      let text = "იყო არაბეთს როსტევან მეფე ღმრთისაგან სვიანი";
      assert.strictEqual(
        anbani.toolkit.frequency(text)["Ი"],
        0.09302325581395349
      );
    });

    it("should be able to be compute friendman score correctly", function () {
      let text = "იყო არაბეთს როსტევან მეფე ღმრთისაგან სვიანი";
      assert.strictEqual(anbani.toolkit.friedman(text), 0.06116642958748222);
    });
  });
});

describe("UMD packaging testing", function () {
  it("should be able to import UMD module at dist/anbani.js", function () {
    assert.strictEqual(typeof anbaniUMD, "object");
  });

  it("should be able to validate import structure with UMD module at dist/anbani.js ", function () {
    assert.strictEqual(anbaniUMD.ab.letters.mkhedruli, anbani.ab.letters.mkhedruli);
  });
});
