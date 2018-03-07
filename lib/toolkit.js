data = require('./data.js')


var frequency = (text, miss="[ა-ჰ-Ⴀ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
    let splitted = text.toUpperCase().split('')
    let length = splitted.length
    let table = {}
    let r = new RegExp(miss)
    for (let i=0; i < length; i++) {
        if (!r.test(splitted[i]))
            continue
        if (!table[splitted[i]])
            table[splitted[i]] = 1
        else 
            table[splitted[i]]++
    }

    for(let key in table) {
        table[key] /= length
    }

    return table
}

var count = (text, miss="[ა-ჰ-Ⴀ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
    let splitted = text.toUpperCase().split('')
    let length = splitted.length
    let table = {}
    let r = new RegExp(miss)
    for (let i=0; i < length; i++) {
        if (!r.test(splitted[i]))
            continue
        if (!table[splitted[i]])
            table[splitted[i]] = 1
        else 
            table[splitted[i]]++
    }

    return table
}

var friedman = (text, miss="[ა-ჰ-Ⴀ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
    let table = count(text, miss)
    let sum = 0
    let total = 0
    for (let key in table){
        sum += table[key] * (table[key] - 1)
        total += table[key]
    }
    return total > 1 ? sum / (total*(total-1)) : 0
}


module.exports = {friedman, frequency, count}