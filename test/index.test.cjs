const assert = require("assert")
const anbani = require("../dist/anbani.js")

describe("CommonJS module compatibility testing", function() {

    it("should be able to transcribe from mkhedruli to asomtavruli", function() { 
        assert.strictEqual(
            anbani.core.convert("იყო არაბეთს როსტევან", "mkhedruli", "mtavruli"),
            "ᲘᲧᲝ ᲐᲠᲐᲑᲔᲗᲡ ᲠᲝᲡᲢᲔᲕᲐᲜ"
        );
    });
});