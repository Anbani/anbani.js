// Tokenizers & cleanup. Port of anbani.py/anbani/nlp/preprocessing.py.
// `.toLowerCase()` folds Mtavruli→Mkhedruli and Asomtavruli→Nuskhuri, matching
// Python's str.lower() (both use Unicode case mappings).
const _nestedTokenize = (text, firstSeparator = "\n", secondSeparator = " ") =>
  text
    .split(firstSeparator)
    .filter((sentence) => sentence !== "")
    .map((sentence) =>
      sentence
        .trim()
        .split(secondSeparator)
        .filter((token) => token !== "")
    );

const sentenceTokenize = (text) => {
  text = text.replace(/[^Ⴀ-ჿⴀ-ⴥᲐ-Ჿ.?!]/g, " ");
  text = text.replace(/[?!]/g, ".");
  text = text.replace(/\s+/g, " ");
  text = text.toLowerCase();
  return _nestedTokenize(text, ".");
};

const paragraphTokenize = (text) => {
  text = text.replace(/[^Ⴀ-ჿⴀ-ⴥᲐ-Ჿ\n]/g, " ");
  text = text.toLowerCase();
  return _nestedTokenize(text, "\n");
};

const wordTokenize = (text) => {
  text = text.replace(/[^Ⴀ-ჿⴀ-ⴥᲐ-Ჿ]/g, " ");
  text = text.replace(/\s+/g, " ");
  text = text.toLowerCase();
  return text.split(" ").filter((token) => token !== "");
};

const cleanup = (text) => {
  text = text.replace(/[^Ⴀ-ჿⴀ-ⴥᲐ-Ჿ.?!,]/g, " ");
  text = text.replace(/\s+/g, " ");
  return text.toLowerCase();
};

export { sentenceTokenize, paragraphTokenize, wordTokenize, cleanup };
export default { sentenceTokenize, paragraphTokenize, wordTokenize, cleanup };
