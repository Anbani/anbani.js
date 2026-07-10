import data from "./data.mjs";
import { checkForAliases, classifyText, checkForDirection, isBicameral, toUpperCase, detectAlphabet, setCharAt } from "./utils.mjs";


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
    if (str == null || classifyText(str) === "unknown")
        throw new Error("Could not detect the source script of the given text.")
    let dir = { to }
    checkForAliases(dir)
    return safeConvert(str, detectAlphabet(str, str.length - 1), dir.to)
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
        converted += key === undefined ? str[i] : key;
    }
    return converted;
}

const convertBicameral = (str, from, to) => {
    const rules = {
        "sasataure": {
            upper: "asomtavruli",
            lower: "mtavruli"
        },

        "tfileliseuli": {
            upper: "mtavruli",
            lower: "mkhedruli"
        },

        "shanidziseuli": {
            upper: "asomtavruli",
            lower: "mkhedruli"
        },

        "khutsuri": {
            upper: "asomtavruli",
            lower: "nuskhuri"
        }
    }

    let upperScript = rules[to].upper;
    let lowerScript = rules[to].lower;

    let converted = "";
    for (let i = 0, len = str.length; i < len; i++) {
        let key = data.alphabets[lowerScript][indexOfChar(from, str[i])];
        converted += key === undefined ? str[i] : key;
    }

    // First Letter
    converted = toUpperCase(converted, lowerScript, upperScript);

    // Letters after punctuation 
    let matched = converted.match(/[?.!]\s+[A-Za-zႠ-ჰⴀ-ⴠᲐ-Ჰ0-9]/g);
    if (matched != null)
        for (let i = 0; i < matched.length; i++) {
            converted = setCharAt(
                converted,
                converted.indexOf(matched[i]),
                matched[i].substring(0, matched[i].length - 1)
                    .concat(toUpperCase(
                        matched[i][matched[i].length - 1],
                        lowerScript,
                        upperScript
                    ))
            );
        }

    // Letters after special character ' apostrophe
    matched = converted.match(/[Ⴀ-ჰⴀ-ⴠᲐ-Ჰ]\'/g);
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