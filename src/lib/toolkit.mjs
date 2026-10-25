import data from "./data.mjs";

const frequency = (text, miss="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
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

const count = (text, miss="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
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

const friedman = (text, miss="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]") => {
    let table = count(text, miss)
    let sum = 0
    let total = 0
    for (let key in table){
        sum += table[key] * (table[key] - 1)
        total += table[key]
    }
    return total > 1 ? sum / (total*(total-1)) : 0
}


// Letter -> numeral value, for every Georgian script (data.alphabets.numeric; sources: docs/table-sources.md).
let numerals = null;
const numeralMap = () => {
    if (numerals) return numerals
    numerals = new Map()
    const values = data.alphabets.numeric
    for (const script of ["mkhedruli", "mtavruli", "asomtavruli", "nuskhuri"])
        data.alphabets[script].forEach((ch, i) => {
            const v = Number(values[i])
            if (ch && values[i] && Number.isInteger(v) && !numerals.has(ch)) numerals.set(ch, v)
        })
    return numerals
}

// Sum of the letters' numeral values (ჩქ -> 1600); everything else counts 0. Mirrors anbani.py numeric_value.
const numericValue = (text) => {
    const map = numeralMap()
    let sum = 0
    for (let i = 0, len = text.length; i < len; i++) sum += map.get(text[i]) || 0
    return sum
}


export default {friedman, frequency, count, numericValue};