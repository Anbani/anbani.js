// Georgianisation — redeem others' qwerty sins. Port of
// anbani.py/anbani/nlp/georgianisation.py.
//
// CRITICAL PARITY NOTE: Python's `\w`/`\b` are Unicode-aware; JavaScript's are
// ASCII-only. The chevron helpers below MUST therefore use an explicit Unicode
// word-character class ([\p{L}\p{N}\p{M}\p{Pc}], the closest match to Python's
// `\w`) plus lookaround boundaries under the `u` flag — never literal \w/\b, or
// Georgian words would silently fall out of every substitution.
import { parseCsv } from "./csv.mjs";
import { readAmbigramCsv } from "./data-io.mjs";

const diphthongMapping = [
  ["tsch", "ჭ"],
  ["tch", "ჭ"],
  ["ch", "ჩ"],
  ["sh", "შ"],
  ["dz", "ძ"],
  ["kh", "ხ"],
  ["th", "თ"],
  ["zh", "ჟ"],
  ["jh", "ჟ"],
  ["ph", "ფ"],
  ["gh", "ღ"],
  ["ts", "ც"],
];

const commonErrors = {
  t: ["ტ", "თ"],
  p: ["ფ", "პ"],
  c: ["ც", "წ"],
  k: ["ქ", "კ"],
  j: ["ჯ", "ჟ"],
  // g: ["გ", "ღ"],
};

const letterMapping = [
  ["a", "ა"], ["A", "ა"], ["b", "ბ"], ["B", "ბ"], ["c", "ც"], ["C", "ჩ"],
  ["d", "დ"], ["D", "დ"], ["e", "ე"], ["E", "ე"], ["f", "ფ"], ["F", "ფ"],
  ["g", "გ"], ["G", "გ"], ["h", "ჰ"], ["H", "ჰ"], ["i", "ი"], ["I", "ი"],
  ["j", "ჯ"], ["J", "ჯ"], ["k", "კ"], ["K", "კ"], ["l", "ლ"], ["L", "ლ"],
  ["m", "მ"], ["M", "მ"], ["n", "ნ"], ["N", "ნ"], ["o", "ო"], ["O", "ო"],
  ["p", "პ"], ["P", "პ"], ["q", "ქ"], ["Q", "ქ"], ["r", "რ"], ["R", "ღ"],
  ["s", "ს"], ["S", "შ"], ["t", "ტ"], ["T", "თ"], ["u", "უ"], ["U", "უ"],
  ["v", "ვ"], ["V", "ვ"], ["w", "წ"], ["W", "ჭ"], ["x", "ხ"], ["X", "ხ"],
  ["y", "ყ"], ["Y", "ყ"], ["z", "ზ"], ["Z", "ძ"],
];

// Closest JS equivalent of Python's Unicode `\w`.
const W = "\\p{L}\\p{N}\\p{M}\\p{Pc}";
const _wrapRe = new RegExp(
  `(?<![${W}])(?:[${W}]+-[${W}]+|[${W}]+)(?![${W}])`,
  "gu"
);
const _unwrapRe = new RegExp(`<([${W}]+)>`, "gu");

const _decapitalise = (text) => {
  const parts = text.split(/([.!?]\s*)/);
  const lowercaseFirstWord = (sentence) => {
    const idx = sentence.indexOf(" ");
    if (idx === -1) return sentence.toLowerCase();
    return sentence.slice(0, idx).toLowerCase() + sentence.slice(idx);
  };
  const bodies = parts.filter((_, i) => i % 2 === 0).map(lowercaseFirstWord);
  let result = "";
  for (let i = 0; i < bodies.length; i++) {
    result += bodies[i] + (2 * i + 1 < parts.length ? parts[2 * i + 1] : "");
  }
  return result;
};

const _transliterateDiphthongs = (sentence) => {
  for (const [dfrom, dto] of diphthongMapping) {
    sentence = sentence.replaceAll(dfrom, dto);
  }
  return sentence;
};

const _transliterateLetters = (sentence, evenAmbiguous = true) => {
  for (const [mfrom, mto] of letterMapping) {
    if (!evenAmbiguous && mfrom in commonErrors) continue;
    sentence = sentence.replaceAll(mfrom, mto);
  }
  return sentence;
};

const _chevronWrap = (sentence) =>
  sentence.replace(_wrapRe, (m) => "<" + m + ">");

const _chevronUnwrap = (sentence) => sentence.replace(_unwrapRe, "$1");

const _transliterateNgrams = (sentence, ambigrams) => {
  for (const [nfrom, nto] of ambigrams) {
    if (sentence.includes(nfrom)) sentence = sentence.replaceAll(nfrom, nto);
  }
  return sentence;
};

// Balanced ambigram table (MASKED -> NGRAM), lazily loaded and cached: the
// browser data-io throws here, so eager loading would break the UMD bundle.
let _balanced = null;
const _loadBalanced = () => {
  if (_balanced === null) {
    _balanced = parseCsv(readAmbigramCsv())
      .filter((row) => row.REDUNDANT.trim().toLowerCase() !== "true")
      .map((row) => [row.MASKED, row.NGRAM]);
  }
  return _balanced;
};

const georgianiseFast = (sentence) =>
  _transliterateLetters(_transliterateDiphthongs(sentence));

const georgianiseBalanced = (sentence) => {
  sentence = _decapitalise(sentence);
  sentence = _chevronWrap(sentence);
  sentence = _transliterateDiphthongs(sentence);
  sentence = _transliterateLetters(sentence, false);
  sentence = _transliterateNgrams(sentence, _loadBalanced());
  sentence = _chevronUnwrap(sentence);
  return sentence;
};

const georgianise = (sentence, mode = "balanced") => {
  if (mode === "accurate") {
    throw new Error(
      "The 'accurate' georgianisation table is a Python-only extra (too large " +
        "for npm). Use 'balanced' or 'fast'."
    );
  }
  if (mode === "balanced") return georgianiseBalanced(sentence);
  return georgianiseFast(sentence);
};

const latinise = (sentence) => {
  for (const [latin, letters] of Object.entries(commonErrors)) {
    for (const letter of letters) sentence = sentence.replaceAll(letter, latin);
  }
  for (const [dto, dfrom] of diphthongMapping) {
    sentence = sentence.replaceAll(dfrom, dto);
  }
  for (const [mto, mfrom] of letterMapping) {
    sentence = sentence.replaceAll(mfrom, mto);
  }
  return sentence;
};

export {
  georgianise,
  georgianiseFast,
  georgianiseBalanced,
  latinise,
  diphthongMapping,
  letterMapping,
  commonErrors,
};
export default {
  georgianise,
  georgianiseFast,
  georgianiseBalanced,
  latinise,
  diphthongMapping,
  letterMapping,
  commonErrors,
};
