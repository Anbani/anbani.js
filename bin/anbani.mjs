#!/usr/bin/env node
// anbani CLI. Runs straight from src (no build needed). Subcommands mirror the
// anbani.py `anbani` command: convert / interpret / lorem here, with
// georgianise / latinise / expand / contract added alongside the NLP port.
import anbani from "../src/anbani.mjs";

const [cmd, ...rest] = process.argv.slice(2);

const die = (err) => {
  console.error(`error: ${err.message ?? err}`);
  process.exit(1);
};

const commands = {
  // convert <text> <from> <to>
  convert([text, from, to]) {
    console.log(anbani.core.convert(text, from, to));
  },
  // interpret <text> [to=mtavruli]
  interpret([text, to = "mtavruli"]) {
    console.log(anbani.core.interpret(text, to));
  },
  // lorem [nwords=8]
  lorem([nwords = "8"]) {
    console.log(anbani.lorem.sentences(parseInt(nwords, 10)));
  },
  help() {
    console.log(
      "Usage: anbani <command> ...\n" +
        "  convert   <text> <from> <to>\n" +
        "  interpret <text> [to=mtavruli]\n" +
        "  lorem     [words=8]\n" +
        "  <text> [to]            (shorthand for: interpret <text> [to])"
    );
  },
};

if (!cmd) {
  commands.help();
} else if (Object.prototype.hasOwnProperty.call(commands, cmd)) {
  try {
    commands[cmd](rest);
  } catch (err) {
    die(err);
  }
} else {
  // Legacy shorthand: `anbani <text> [to]` -> interpret.
  try {
    console.log(anbani.core.interpret(cmd, rest[0] ?? "mtavruli"));
  } catch (err) {
    die(err);
  }
}
