data = require('./data.js')

freqs = data.frequency.summed
dataset = data.vefxwords

var loadWordlist = (wordlist) => 
{
    dataset = wordlist
}

var sentences = (nwords) => {
    return createSentences(createWords(nwords))
} 


var paragraphs = (nwords, npar, newline="\n\n") => {
    let paragraphs = ""

    for (let i=0; i < npar; i++){
        paragraphs += createSentences(createWords(nwords)) + newline
    }

    return paragraphs
}

var createSentences = (words) => {
    var sentences = ""
    
    for (let i=0; i < words.length; i++){
        sentences += words[i] + randomMark()
    }
    sentences = sentences.trim()
    sentences = sentences.setCharAt(sentences.length-1, '.', 0)   
    return sentences
}

String.prototype.setCharAt = function(where, what, offset) 
{
    offset = offset || 0;
    if(where > this.length-1) return this;
    return this.substr(0,where) + what + this.substr(where+what.length+offset);
}

var randomMark = () => {
    let r = Math.random()
    for (let i=0; i<freqs.length; i++) {
        if (r < freqs[i][1])
            return freqs[i][0] + ' '
    }
    return ' '
}

var createWords = (nwords) => {
    let words = []
    dslength = dataset.length
    for (let i=0; i < nwords; i++){
        words.push(dataset[randomNumber(0,dslength)])
    }
    return words

}

// Random number [min, max)
var randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}


module.exports = {sentences, paragraphs, loadWordlist}