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


export default {friedman, frequency, count};