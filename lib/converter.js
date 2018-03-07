data = require('./data.js');

var convert = (str, from, to) => {
    checkForAliases(from, to)
    checkForDirection(from, to)
    return safeConvert(str, from, to)
}

var checkForAliases = (from, to) => {
    var aliases = {
        'მხედრული':'mkhedruli',
        'ასომთავრული':'asomtavruli',
        'ნუსხური':'nuskhuri',
        'მთავრული':'mtavruli',
        'ხუცური':'khutsuri',
        'შანიძისეული':'shanidziseuli',
        'ტფილელისეული':'tfileliseuli',
        'ფონეტიკური':'phonetic',
        'ლათინური':'qwerty',
        'კირილიცა':'cyrillicQwerty',
        'ტრანსკრიფცია':'transcription',
        'ქვერთი':'qwerty',
        'ზოგადი':'common',
        'ისო':'iso_9984',
    }

    Object.keys(aliases).forEach(function(key) {
        if (key == from) {
            from = aliases[key]
        }
        if (key == to) {
            to = aliases[key]
        }
    });
}

var checkForDirection = (from, to) => {
    var permitted_from = ["mkhedruli", "asomtavruli", "nuskhuri", "mtavruli", "cyrillic", "cyrillicQwerty", "qwerty"]
    var permitted_to = ["mkhedruli", "asomtavruli", "nuskhuri", "mtavruli", "cyrillicQwerty", "qwerty", "khutsuri", "shanidziseuli", "tfileliseuli", "phonetic", "transcription", "common", "iso_9984"]
    if (permitted_from.indexOf(from) == -1)
        throw `Text conversion from '${from}' is not supported.`
    if (permitted_to.indexOf(to) == -1)
        throw `Text conversion to '${to}' is not supported.`
        
}

var convertUnicameral = (str, from, to) => {
    let converted = "";
    for (let i = 0, len = str.length; i < len; i++)
    {
        let key = data.alphabets[to][data.alphabets[from].indexOf(str[i])];
        converted += key===undefined?str[i]:key;
    }
    return converted;
}

var convertBicameral = (str, from, to) =>
{
    var rules = {
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

String.prototype.setCharAt = function(where, what, offset) 
{
    offset = offset || 0;
    if(where > this.length-1) return this;
    return this.substr(0,where) + what + this.substr(where+what.length+offset);
}

var toUpperCase = (word, from, to) => {
    let char = data.alphabets[to][data.alphabets[from].indexOf(word[0])];
    char = char==undefined?word[0]:char;
    return word.setCharAt(0,char);
}

var isUnsupported = (str) => {
    return [
        data.regex.cyrillic.test(str)
    ].some(testResult => testResult == true);
}

var isBicameral = (to) =>
{
    return to == "tfileliseuli" || to == "shanidziseuli" || to == "khutsuri";
}

var safeConvert = (str, from, to) => 
{
    if (str != null)
        if (!isBicameral(to))
            return convertUnicameral(str, from, to);
        else
            return convertBicameral(str, from, to);
}

var interpret = (str, to) => {
    checkForAliases('', to)
    if (str != null)
        if (isBicameral(to))
            return convertBicameral(str, detectScript(str[str.length-1]), to);
        else 
            return convertUnicameral(str, detectScript(str[str.length-1]), to);
}

var detectScript = (str) => 
{
    let vector = [
        data.regex.mkhedruli.test(str),
        data.regex.mtavruli.test(str),
        data.regex.asomtavruli.test(str),
        data.regex.nuskhuri.test(str),
        data.regex.latin.test(str),
        data.regex.cyrillic.test(str)
    ];


    // Georgian alphabets
    if (isSame(vector, [true, false, false, false, false, false]))
        return "mkhedruli";

    // Non-Georgian alphabets
    if (isSame(vector, [false, false, false, false, true, false]))
        return "qwerty";

    if (isSame(vector, [false, false, false, false, false, true]))
        return "cyrillic";

    if (isSame(vector, [false, false, true, false, false, false]))
        return "asomtavruli";

    if (isSame(vector, [false, true, false, false, false, false]))
        return "mtavruli";

    if (isSame(vector, [false, false, false, true, false, false]))
        return "nuskhuri";


    return "mkhedruli";
}


var detect = (str) => {
    /* MATCHES ALPHABETS [Mkhedruli, Mtavruli, Asomtavruli, Nuskhuri, Latin, Cyrillic] */
    let vector = [
        data.regex.mkhedruli.test(str),
        data.regex.mtavruli.test(str),
        data.regex.asomtavruli.test(str),
        data.regex.nuskhuri.test(str),
        data.regex.latin.test(str),
        data.regex.cyrillic.test(str)
    ];


    // Georgian alphabets
    if (isSame(vector, [true, false, false, false, false, false]))
        return "mkhedruli";

    if (isSame(vector, [false, true, false, false, false, false]))
        return "mtavruli";

    if (isSame(vector, [false, false, true, false, false, false]))
        return "asomtavruli";

    if (isSame(vector, [false, false, false, true, false, false]))
        return "nuskhuri";


    // Georgian bicameral writings
    if (isSame(vector, [true, true, false, false, false, false]))
        return "tfileliseuli";

    if (isSame(vector, [true, false, true, false, false, false]))
        return "shanidziseuli";

    if (isSame(vector, [false, false, true, true, false, false]))
        return "khutsuri";


    // Non-Georgian alphabets
    if (isSame(vector, [false, false, false, false, true, false]))
        return "latin";

    if (isSame(vector, [false, false, false, false, false, true]))
        return "cyrillic";

    return vector;
}

/* UTILS & WRAPPERS */
// Char Code At
var cca = (char) => char.charCodeAt(0);

// From Char Code
var fcc = (code) => String.fromCharCode(code);

// same length [Boolean] equals
var isSame = (b1, b2) => {
    for (let i = 0, len = b1.length; i < len; i++) {
        if (b1[i] != b2[i])
            return false;
    }
    return true;
}

module.exports = {convert, interpret}