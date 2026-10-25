import data from "./data.mjs";
import { checkForAliases, classifyText, checkForDirection, isBicameral, toUpperCase, setCharAt } from "./utils.mjs";

// Bicameral scripts pair an upper-case and a lower-case unicameral script. Mirrors anbani.py BICAMERAL_RULES.
const BICAMERAL_RULES = {
    sasataure: { upper: "asomtavruli", lower: "mtavruli" },
    tfileliseuli: { upper: "mtavruli", lower: "mkhedruli" },
    shanidziseuli: { upper: "asomtavruli", lower: "mkhedruli" },
    khutsuri: { upper: "asomtavruli", lower: "nuskhuri" },
};


const convert = (str, from, to) => {
    let dir = { from, to }
    checkForAliases(dir)
    checkForDirection(dir)
    return safeConvert(str, dir.from, dir.to)
}

const interpret = (str, to) => {
    // Match anbani.py: refuse text whose source script can't be identified
    // (null/undefined, mixed scripts, digits, empty) instead of passing it
    // through. The explicit null check matters — regex.test(null) coerces to
    // the string "null" and would misclassify as latin.
    let from = str == null ? "unknown" : classifyText(str)
    if (from === "unknown")
        throw new Error("Could not detect the source script of the given text.")
    if (from in BICAMERAL_RULES) {
        // Mixed-case Georgian: fold the upper script into the lower one, then convert from it (anbani.py interpret).
        const { upper, lower } = BICAMERAL_RULES[from]
        let folded = ""
        for (let i = 0, len = str.length; i < len; i++) {
            const key = data.alphabets[lower][indexOfChar(upper, str[i])]
            folded += key === undefined || key === "" ? str[i] : key
        }
        str = folded
        from = lower
    }
    let dir = { from: from === "latin" ? "qwerty" : from, to }
    checkForAliases(dir)
    checkForDirection(dir)
    return safeConvert(str, dir.from, dir.to)
}

// Per-alphabet char -> first-index maps, built on first use. Mirrors
// Array.indexOf's first-match semantics exactly (first-wins on duplicates), so
// conversion output is byte-identical to the old indexOf scan — just O(1) per
// character instead of O(m). data.alphabets is never mutated at runtime.
const reverseIndex = new Map();
const indexOfChar = (from, ch) => {
    let map = reverseIndex.get(from);
    if (map === undefined) {
        map = new Map();
        const alphabet = data.alphabets[from];
        for (let i = 0, len = alphabet.length; i < len; i++)
            if (!map.has(alphabet[i])) map.set(alphabet[i], i);
        reverseIndex.set(from, map);
    }
    const idx = map.get(ch);
    return idx === undefined ? -1 : idx;
};

const convertUnicameral = (str, from, to) => {
    let converted = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let key = data.alphabets[to][indexOfChar(from, str[i])];
        // No counterpart ("" or not in the source table): keep the character, never drop it.
        converted += key === undefined || key === "" ? str[i] : key;
    }
    return converted;
}

const SENTENCE_LETTER = "A-Za-zა-ჿႠ-ჅჇჍⴀ-ⴥⴧⴭᲐ-Ჿ0-9";
const SENTENCE_START = new RegExp(
    "((?:^|\\n[ \\t]*\\n)[\\s„“\"«‘(\\[—–-]*|[?.!჻][”“\"»’)\\]]*\\s+[„“\"«‘(\\[]*|:\\s*[„“\"«])" +
    "([" + SENTENCE_LETTER + "])", "g");

const convertBicameral = (str, from, to) => {
    let upperScript = BICAMERAL_RULES[to].upper;
    let lowerScript = BICAMERAL_RULES[to].lower;

    let converted = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let key = data.alphabets[lowerScript][indexOfChar(from, str[i])];
        converted += key === undefined || key === "" ? str[i] : key;
    }

    // Sentence starts take the upper script, in one linear pass:
    //   - the text's start and every paragraph start (blank line), past opening quotes, brackets and dialogue dashes;
    //   - a letter after ? . ! ჻, past closing quotes and brackets, whitespace, then opening quotes;
    //   - direct speech after a colon (: „).
    // Never after ; , … or a single line break without a terminator (verse lines continue their sentence), and never
    // after a dash mid-paragraph ("ჭირიაო! — იტყოდა": the author's words). Mirrors anbani.py SENTENCE_START.
    converted = converted.replace(SENTENCE_START, (m, pre, letter) => pre + toUpperCase(letter, lowerScript, upperScript));

    // Letters after special character ' apostrophe (every Georgian letter; mirrors anbani.py)
    let matched = converted.match(/[ა-ჿႠ-ჅჇჍⴀ-ⴥⴧⴭᲐ-Ჿ]'/g);
    if (matched != null)
        for (let i = 0; i < matched.length; i++) {
            converted = setCharAt(
                converted,
                converted.indexOf(matched[i]),
                toUpperCase(matched[i][0], lowerScript, upperScript),
            1);
        }

    return converted;
}

const safeConvert = (str, from, to) => {
    if (str != null)
        if (!isBicameral(to))
            return convertUnicameral(str, from, to);
        else
            return convertBicameral(str, from, to);
}

// Script classifier. `classify` is the blessed name (it matches the
// cross-language golden id "core.classify"); `$` is the historical alias. Both
// are callable AND carry .classifyText, so core.$(text), core.classify(text)
// and core.$.classifyText(text) all work. Wrapping classifyText (rather than
// assigning it) keeps the shared utils function unmutated.
const classify = (str) => classifyText(str);
classify.classifyText = classifyText;

export { convert, interpret, classify, convertUnicameral, convertBicameral, safeConvert }

export default {
    convert,
    interpret,
    classify,
    $: classify
};