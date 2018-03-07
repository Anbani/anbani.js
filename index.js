converter = require('./lib/converter.js')
lorem = require('./lib/lorem.js')
toolkit = require('./lib/toolkit.js')

var anbani = {
    convert: converter.convert,
    interpret: converter.interpret
    , lorem, toolkit
}

module.exports = anbani