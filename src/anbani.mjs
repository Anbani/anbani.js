import core from "./lib/core.mjs";
import lorem from "./lib/lorem.mjs";
import toolkit from "./lib/toolkit.mjs";
import data from "./lib/data.mjs";
import utils from "./lib/utils.mjs";

core.$ = {classifyText : utils.classifyText}
let scripts = Object.keys(data.alphabets).slice(0,4)
    .concat(["khutsuri", "shanidziseuli", "tfileliseuli", "anbanismtavruli"])
    .concat(Object.keys(data.alphabets).slice(4));

// Convenience module 
let ab = {
    letters : {
        mkhedruli: data.alphabets.mkhedruli.join(''),
        asomtavruli: data.alphabets.asomtavruli.join(''),
        nuskhuri: data.alphabets.nuskhuri.join(''),
        mtavruli: data.alphabets.mtavruli.join(''),
    },

    keys : scripts,
    
    caps : (text) => core.convert(text, "mkhedruli", "mtavruli"),
    bicam : (text) => core.convert(text, "mkhedruli", "shanidziseuli"),
    bicaps : (text) => core.convert(text, "mkhedruli", "anbanismtavruli"),
}

// Abstract anbani
const anbani = {
    core, lorem, toolkit, data, utils, ab
};


export {core, lorem, toolkit, data, utils, ab}
export default anbani
