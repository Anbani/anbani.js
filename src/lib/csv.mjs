// Minimal CSV reader for our data files. The shipped CSVs are quote-free with a
// constant column count (verified in CI by the parity checks), so a naive
// split(",") is safe and mirrors Python's csv.DictReader row-for-row.
export const parseCsv = (text) => {
  const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
  const header = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    const row = {};
    header.forEach((key, i) => {
      row[key] = cells[i];
    });
    return row;
  });
};

export default { parseCsv };
