import core from "./lib/core.mjs";
import lorem from "./lib/lorem.mjs";
import toolkit from "./lib/toolkit.mjs";
import data from "./lib/data.mjs";
import utils from "./lib/utils.mjs";
import contractions from "./lib/contractions.mjs";
import georgianisation from "./lib/georgianisation.mjs";
import preprocessing from "./lib/preprocessing.mjs";

// Natural-language utilities, mirroring anbani.py's `anbani.nlp` package.
const nlp = { contractions, georgianisation, preprocessing };

let scripts = Object.keys(data.alphabets).slice(0,4)
    .concat(["khutsuri", "shanidziseuli", "tfileliseuli", "sasataure"])
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
    bicaps : (text) => core.convert(text, "mkhedruli", "sasataure"),
}

// Abstract anbani
const anbani = {
    core, lorem, toolkit, data, utils, ab, nlp
};


export {core, lorem, toolkit, data, utils, ab, nlp}
export default anbani
