import anbani, { data } from "../src/anbani.mjs";
import fs from "fs";

let n = data.alphabets["mkhedruli"].length;
console.log("> make sure all of the alphabets are of same length:")
Object.keys(data.alphabets).every(
  (a) => {
    if (data.alphabets[a].length != data.alphabets["mkhedruli"].length) {
      console.log(`! ${a} is not same length as mkhedruli`)
      return false
    }
    return true
  }
);

let rows = "";
let word = "ქართული";
let sentence = "დავით აღმაშენებელი ქართველთა წმინდანია";
let scripts = Object.keys(data.alphabets).slice(0,4)
    .concat(["khutsuri", "shanidziseuli", "tfileliseuli"])
    .concat(Object.keys(data.alphabets).slice(4));

scripts.forEach((s) => {
  rows += `|${s}|${anbani.core.convert(
    word,
    "mkhedruli",
    s
  )}|${anbani.core.convert(sentence, "mkhedruli", s)}|\n`;
});

let template = `
|               | word      | sentence                             |
|---------------|-----------|--------------------------------------|
${rows}
___
${"|".repeat(n + 2)}
${"|" + "-|".repeat(n + 1)}
`;

Object.keys(data.alphabets).forEach((a) => {
  template += `|${a}|` + data.alphabets[a].join("|") + "|\n";
});

fs.writeFile("utils/table.md", template, (err) => {
  console.log("< table.md has been updated ");
});
