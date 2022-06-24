#! /usr/bin/env node
const anbani = require("../dist/anbani.js")

let args = process.argv.slice(2)

switch (args.length) {
  case 1:
    console.log('\n' + anbani.core.interpret(args[0], 'mtavruli'))
    break;

  case 2:
    try {
      console.log('\n' + anbani.core.interpret(args[0], args[1]))
    } catch (error) {
      console.log("Please enter proper transliteration key as your second argument from:\n", anbani.ab.keys, '\n', error)
    }
    break;

  default:
    console.log('\n' + anbani.core.interpret("გამარჯობა", 'mtavruli'))
    console.log('\n' + anbani.core.interpret("გამარჯობა", 'asomtavruli'))
    break;
}