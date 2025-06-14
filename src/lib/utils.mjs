import data from "./data.mjs";

export const checkForAliases = (dir) => {
    var aliases = {
        მხედრული: "mkhedruli",
        ასომთავრული: "asomtavruli",
        ნუსხური: "nuskhuri",
        მთავრული: "mtavruli",
        ხუცური: "khutsuri",
        შანიძისეული: "shanidziseuli",
        ტფილელისეული: "tfileliseuli",
        სასათაურე: "sasataure",
        ჰომოგლიფი: "homoglyph",
        ბრაილი: "braille",
        ფონეტიკური: "phonetic",
        ლათინური: "qwerty",
        კირილიცა: "cyrillic",
        ბერძნული: "greek",
        სომხური: "armenian",
        ნაციონალური: "national",
        ქვერთი: "qwerty",
        ზოგადი: "common",
        ტრანსკრიფცია: "common",
        ისო: "iso_9984",
        ბგნ: "bgn",
    };

    Object.keys(aliases).forEach(function (key) {
        if (key == dir.from) {
            dir.from = aliases[key];
        }
        if (key == dir.to) {
            dir.to = aliases[key];
        }
    });
};

export const checkForDirection = (dir) => {
    let permitted_from = [
        "mkhedruli",
        "asomtavruli",
        "nuskhuri",
        "mtavruli",
        "qwerty",
        "braille",
    ];
    let permitted_to = [
        //    everything is permitted
    ];
    if (permitted_from.indexOf(dir.from) == -1)
        throw `Text conversion from '${dir.from}' is not supported.`;
    // if (permitted_to.indexOf(dir.to) == -1)
    //     throw `Text conversion to '${dir.to}' is not supported.`;
};

export const isUnsupported = (str) => {
    return [data.regex.cyrillic.test(str)].some(
        (testResult) => testResult == true
    );
};

export const isBicameral = (to) => {
    return to == "tfileliseuli" || to == "shanidziseuli" || to == "khutsuri" || to == "sasataure";
};

String.prototype.setCharAt = function (where, what, offset) {
    offset = offset || 0;
    if (where > this.length - 1) return this;
    return (
        this.substring(0, where) + what + this.substring(where + what.length + offset)
    );
};

export const toUpperCase = (word, from, to) => {
    let char = data.alphabets[to][data.alphabets[from].indexOf(word[0])];
    char = char == undefined ? word[0] : char;
    return word.setCharAt(0, char);
};

export const detectAlphabet = (str, idx) => {
    if (idx < 0)
        return "qwerty"
    if (data.regex.mkhedruli.test(str[idx]))
        return "mkhedruli";
    if (data.regex.latin.test(str[idx]))
        return "qwerty";
    if (data.regex.asomtavruli.test(str[idx]))
        return "asomtavruli";
    if (data.regex.mtavruli.test(str[idx]))
        return "mtavruli";
    if (data.regex.nuskhuri.test(str[idx]))
        return "nuskhuri";
    return detectAlphabet(str, idx - 1);
};

export const classifyText = (str) => {
    /* MATCHES ALPHABETS [Mkhedruli, Mtavruli, Asomtavruli, Nuskhuri, Latin, Cyrillic] */
    let vector = [
        data.regex.mkhedruli.test(str),
        data.regex.mtavruli.test(str),
        data.regex.asomtavruli.test(str),
        data.regex.nuskhuri.test(str),
        data.regex.latin.test(str),
        data.regex.cyrillic.test(str),
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

    if (isSame(vector, [false, true, true, false, false, false]))
        return "sasataure";

    // Non-Georgian alphabets
    if (isSame(vector, [false, false, false, false, true, false]))
        return "latin";

    if (isSame(vector, [false, false, false, false, false, true]))
        return "cyrillic";

    return vector;
};

// Char Code At
export const cca = (char) => char.charCodeAt(0);

// From Char Code
export const fcc = (code) => String.fromCharCode(code);

// same length [Boolean] equals
export const isSame = (b1, b2) => {
    for (let i = 0, len = b1.length; i < len; i++) {
        if (b1[i] != b2[i]) return false;
    }
    return true;
};

export default { checkForAliases, checkForDirection, isUnsupported, isBicameral, toUpperCase, detectAlphabet, classifyText, cca, fcc, isSame };
