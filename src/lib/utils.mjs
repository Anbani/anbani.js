import data from "./data.mjs";

var utils = {};

utils.checkForAliases = (dir) => {
    var aliases = {
        მხედრული: "mkhedruli",
        ასომთავრული: "asomtavruli",
        ნუსხური: "nuskhuri",
        მთავრული: "mtavruli",
        ხუცური: "khutsuri",
        შანიძისეული: "shanidziseuli",
        ტფილელისეული: "tfileliseuli",
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

utils.checkForDirection = (dir) => {
    let permitted_from = [
        "mkhedruli",
        "asomtavruli",
        "nuskhuri",
        "mtavruli",
        "qwerty",
    ];
    let permitted_to = [
    //    everything is permitted
    ];
    if (permitted_from.indexOf(dir.from) == -1)
        throw `Text conversion from '${dir.from}' is not supported.`;
    // if (permitted_to.indexOf(dir.to) == -1)
    //     throw `Text conversion to '${dir.to}' is not supported.`;
};

utils.isUnsupported = (str) => {
    return [data.regex.cyrillic.test(str)].some(
        (testResult) => testResult == true
    );
};

utils.isBicameral = (to) => {
    return to == "tfileliseuli" || to == "shanidziseuli" || to == "khutsuri";
};

String.prototype.setCharAt = function (where, what, offset) {
    offset = offset || 0;
    if (where > this.length - 1) return this;
    return (
        this.substr(0, where) + what + this.substr(where + what.length + offset)
    );
};

utils.toUpperCase = (word, from, to) => {
    let char = data.alphabets[to][data.alphabets[from].indexOf(word[0])];
    char = char == undefined ? word[0] : char;
    return word.setCharAt(0, char);
};

utils.detectAlphabet = (str) => {
    if (data.regex.mkhedruli.test(str))
        return "mkhedruli";
    if (data.regex.latin.test(str))
        return "qwerty";
    if (data.regex.asomtavruli.test(str))
        return "asomtavruli";
    if (data.regex.mtavruli.test(str))
        return "mtavruli";
    if (data.regex.nuskhuri.test(str))
        return "nuskhuri";
    return "mkhedruli";
};

utils.classifyText = (str) => {
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
    if (utils.isSame(vector, [true, false, false, false, false, false]))
        return "mkhedruli";

    if (utils.isSame(vector, [false, true, false, false, false, false]))
        return "mtavruli";

    if (utils.isSame(vector, [false, false, true, false, false, false]))
        return "asomtavruli";

    if (utils.isSame(vector, [false, false, false, true, false, false]))
        return "nuskhuri";

    // Georgian bicameral writings
    if (utils.isSame(vector, [true, true, false, false, false, false]))
        return "tfileliseuli";

    if (utils.isSame(vector, [true, false, true, false, false, false]))
        return "shanidziseuli";

    if (utils.isSame(vector, [false, false, true, true, false, false]))
        return "khutsuri";

    // Non-Georgian alphabets
    if (utils.isSame(vector, [false, false, false, false, true, false]))
        return "latin";

    if (utils.isSame(vector, [false, false, false, false, false, true]))
        return "cyrillic";

    return vector;
};

// Char Code At
utils.cca = (char) => char.charCodeAt(0);

// From Char Code
utils.fcc = (code) => String.fromCharCode(code);

// same length [Boolean] equals
utils.isSame = (b1, b2) => {
    for (let i = 0, len = b1.length; i < len; i++) {
        if (b1[i] != b2[i]) return false;
    }
    return true;
};

export default utils;
