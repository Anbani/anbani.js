core = require('./lib/core.js')
lorem = require('./lib/lorem.js')
toolkit = require('./lib/toolkit.js')
data = require('./lib/data.js')

var anbani = {
    core, lorem, toolkit,
    data : {
        ab : {
            mkhedruli: data.alphabets.mkhedruli.join(''),
            asomtavruli: data.alphabets.asomtavruli.join(''),
            nuskhuri: data.alphabets.nuskhuri.join(''),
            mtavruli: data.alphabets.mtavruli.join(''),
        },

        lorem : {
            firstNames : data.fnames,
            lastNames : data.lnames,
            words : data.vefxwords
        }
    },
}

module.exports = anbani