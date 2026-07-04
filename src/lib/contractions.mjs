// Georgian contraction ⇄ expansion. Port of anbani.py/anbani/nlp/contractions.py
// — same CSV, same maps, same single-pass boundary-aware substitution.
import { parseCsv } from "./csv.mjs";
import { readContractionsCsv } from "./data-io.mjs";

// CONTRACTION -> EXPANSION, in CSV row order.
const cmap = {};
for (const row of parseCsv(readContractionsCsv())) {
  cmap[row.CONTRACTION] = row.EXPANSION;
}

// Expansion -> contraction. Several contractions share one expansion
// (e.g. "ა. შ." and "ა.შ." both expand to "ასე შემდეგ"); keep the shortest
// contraction, with the string itself as a stable tie-break.
const _isSmaller = (a, b) =>
  a.length < b.length || (a.length === b.length && a < b);

const emap = {};
for (const [contraction, expansion] of Object.entries(cmap)) {
  const incumbent = emap[expansion];
  if (incumbent === undefined || _isSmaller(contraction, incumbent)) {
    emap[expansion] = contraction;
  }
}

const _escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const _replacer = (mapping) => {
  // Single pass: keys matched longest-first (so "ა.ს.ს.რ." wins over its prefix
  // "ა.") and only at Georgian word boundaries (so a key never fires inside a
  // word, e.g. "ჰა" in "ჰაერი"). One pass ⇒ an insertion is never re-replaced.
  const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    "(?<![ა-ჿ])(?:" + keys.map(_escape).join("|") + ")(?![ა-ჿ])",
    "g"
  );
  return (text) => text.replace(pattern, (m) => mapping[m]);
};

const _expandReplacer = _replacer(cmap);
const _contractReplacer = _replacer(emap);

// Single-key lookups.
const expand = (word) => (word in cmap ? cmap[word] : word);
const contract = (phrase) => (phrase in emap ? emap[phrase] : phrase);

// Whole-text substitution.
const expandText = (text) => _expandReplacer(text);
const contractText = (text) => _contractReplacer(text);

export { cmap, emap, expand, expandText, contract, contractText };
export default { cmap, emap, expand, expandText, contract, contractText };
