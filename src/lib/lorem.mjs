import data from "./data.mjs"

const freqs = data.frequency.summed
const dataset = data.vefxwords

const loadWordlist = (wordlist) => 
{
    dataset = wordlist
}

const sentences = (nwords) => {
    return createSentences(createWords(nwords))
} 


const paragraphs = (nwords, npar, newline="\n\n") => {
    let paragraphs = ""

    for (let i=0; i < npar; i++){
        paragraphs += createSentences(createWords(nwords)) + newline
    }

    return paragraphs
}

const createSentences = (words) => {
    let sentences = ""
    
    for (let i=0; i < words.length; i++){
        sentences += words[i] + randomMark()
    }
    sentences = sentences.trim()
    sentences = sentences.setCharAt(sentences.length-1, '.', 1)   
    return sentences
}


const names = (nnames) => {
    let results = []
    for (let i = 0; i < nnames; i++) {
        results.push(randomFirstName() + ' ' + randomLastName())
    }
    return results
}

const randomFirstName = () => {
    return data.fnames[randomNumber(0, data.fnames.length)]
}

const randomLastName = () => {
    return data.lnames[randomNumber(0, data.lnames.length)]
}


String.prototype.setCharAt = function(where, what, offset) 
{
    offset = offset || 0;
    if(where > this.length-1) return this;
    return this.substr(0,where) + what + this.substr(where+what.length+offset);
}

const randomMark = () => {
    let r = Math.random()
    for (let i=0; i<freqs.length; i++) {
        if (r < freqs[i][1])
            return freqs[i][0] + ' '
    }
    return ' '
}

const randomWord = () => {
    return dataset[randomNumber(0,dataset.length)]
}

const createWords = (nwords) => {
    let words = []
    for (let i=0; i < nwords; i++){
        words.push(randomWord())
    }
    return words

}

// Random number [min, max)
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}

const $ = { randomFirstName, randomLastName, randomWord };

export default {
    sentences, paragraphs, loadWordlist, names, $
};