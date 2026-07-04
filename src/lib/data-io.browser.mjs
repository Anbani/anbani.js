// Browser data loader (webpack aliases data-io.mjs to this file for the UMD
// bundle). The 17KB contractions table is inlined via webpack `asset/source`;
// the ~400KB ambigram table is intentionally NOT bundled, so balanced/accurate
// georgianisation is unavailable in the browser — `fast` mode still works.
import contractionsCsv from "../../data/georgian_contractions.csv";

export const readContractionsCsv = () => contractionsCsv;

export const readAmbigramCsv = () => {
  throw new Error(
    "Balanced/accurate georgianisation needs the ~400KB ambigram table, which " +
      "isn't bundled for the browser. Use georgianise(text, 'fast'), or run in " +
      "Node (import from 'anbani')."
  );
};

export default { readContractionsCsv, readAmbigramCsv };
