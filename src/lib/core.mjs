import data from "./data.mjs";
import {checkForAliases, classifyText, checkForDirection, isBicameral, toUpperCase, detectAlphabet} from "./utils.mjs";


const convert = (str, from, to) => {
    let dir = {from, to}
    checkForAliases(dir)
    checkForDirection(dir)
    return safeConvert(str, dir.from, dir.to)
}

const interpret = (str, to) => {
    let dir = {to}
    checkForAliases(dir)
    if (str != null)
        if (isBicameral(dir.to))
            return convertBicameral(str, detectAlphabet(str, str.length-1), dir.to);
        else 
            return convertUnicameral(str, detectAlphabet(str, str.length-1), dir.to);
}

const convertUnicameral = (str, from, to) => {
    let converted = "";
    for (let i = 0, len = str.length; i < len; i++)
    {
        let key = data.alphabets[to][data.alphabets[from].indexOf(str[i])];
        converted += key===undefined?str[i]:key;
    }
    return converted;
}

const convertBicameral = (str, from, to) =>
{
    const rules = {
        "anbanismtavruli": {
            upper : "asomtavruli",
            lower : "mtavruli"
        },
        
        "tfileliseuli": {
            upper : "mtavruli",
            lower : "mkhedruli"
        },

        "shanidziseuli": {
            upper : "asomtavruli",
            lower : "mkhedruli"
        },

        "khutsuri": {
            upper : "asomtavruli",
            lower : "nuskhuri"
        }
    }

    let upperScript = rules[to].upper;
    let lowerScript = rules[to].lower;

    let converted = "";
    for (let i = 0, len = str.length; i < len; i++)
    {
        let key = data.alphabets[lowerScript][data.alphabets[from].indexOf(str[i])];
        converted += key===undefined?str[i]:key;
    }
    
    // First Letter
    converted = toUpperCase(converted, lowerScript, upperScript);


    let matched = converted.match(/[?.!]\s+[A-zႠ-ჰⴀ-ⴠ0-9]/g);
    if (matched != null)
    for(let i = 0; i < matched.length; i++)
    {	
        converted = converted.setCharAt(converted.indexOf(matched[i]), matched[i].substr(0,matched[i].length-1).concat(toUpperCase(matched[i][matched[i].length-1], lowerScript, upperScript)));
    }


    matched = converted.match(/[Ⴀ-ჰⴀ-ⴠ]\'/g);
    if (matched != null)
    for(let i = 0; i < matched.length; i++)
    {	
        converted = converted.setCharAt(converted.indexOf(matched[i]), toUpperCase(matched[i][0], lowerScript, upperScript), 1);
    }
    
    return converted;
}

const safeConvert = (str, from, to) => 
{
    if (str != null)
        if (!isBicameral(to))
            return convertUnicameral(str, from, to);
        else
            return convertBicameral(str, from, to);
}

export {convert, interpret, convertUnicameral, convertBicameral, safeConvert}

export default {
    convert, 
    interpret, 
    $:classifyText
};