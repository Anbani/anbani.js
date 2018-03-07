converter = require('./converter.js')
utils = require('./utils.js')
data = require('./data.js')


module.exports = {
    convert: converter.convert,
    interpret: converter.interpret,
    
    
    $ : {
        classifyText : utils.classifyText,
    }
}