// Node data loader: reads the raw CSV data files from disk. The browser build
// swaps this module for data-io.browser.mjs via a webpack alias (the ambigram
// table is too large to bundle), so keep the two files' exports in lockstep.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dataPath = (name) =>
  fileURLToPath(new URL(`../../data/${name}`, import.meta.url));

export const readContractionsCsv = () =>
  readFileSync(dataPath("georgian_contractions.csv"), "utf-8");

export const readAmbigramCsv = () =>
  readFileSync(dataPath("ambigram_nc5_len7.csv"), "utf-8");

export default { readContractionsCsv, readAmbigramCsv };
