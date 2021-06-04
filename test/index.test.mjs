import assert from 'assert';
import anbani from "../src/anbani.mjs";
import anbaniUMD from "../dist/anbani.js";

describe("ESM source integration testing", function() {

    it("should be able to transcribe from mkhedruli to asomtavruli", function() { 
        assert.strictEqual(
            anbani.core.convert("იყო არაბეთს როსტევან", "mkhedruli", "mtavruli"),
            "ᲘᲧᲝ ᲐᲠᲐᲑᲔᲗᲡ ᲠᲝᲡᲢᲔᲕᲐᲜ"
        );
    });

    it("should be able to interpret things in mkhedruli", function() { 
        assert.strictEqual(
            anbani.core.interpret("iyo arabeTs rostevan", "mkhedruli"),
            "იყო არაბეთს როსტევან"
        );
    });

    it("should be able to classify mkhedruli", function() { 
        assert.strictEqual(
            anbani.core.$.classifyText("როსტევან"),
            "mkhedruli"
        );
    });

    it("should be able to access mkhedruli alphabet string", function() { 
        assert.strictEqual(
            anbani.data.ab.mkhedruli,
            "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶჷჸჹჺჽ"
        );
    });

});


describe("UMD packaging testing", function() {

    it("should be able to import UMD module at dist/anbani.js", function() { 
        assert.strictEqual(
            typeof anbaniUMD,
            "object"
        );
    });

    it("should be able to validate import structure with UMD module at dist/anbani.js ", function() { 
        assert.strictEqual(
            anbaniUMD.data.ab.mkhedruli,
            anbani.data.ab.mkhedruli 
        );
    });

});