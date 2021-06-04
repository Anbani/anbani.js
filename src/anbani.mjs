import core from "./lib/core.mjs";
import lorem from "./lib/lorem.mjs";
import toolkit from "./lib/toolkit.mjs";
import data from "./lib/data.mjs";
import utils from "./lib/utils.mjs";

core.$ = {classifyText : utils.classifyText}

const anbani = {
    core, lorem, toolkit,
    data : {
        ab : {
            mkhedruli: data.alphabets.mkhedruli.join(''),
            asomtavruli: data.alphabets.asomtavruli.join(''),
            nuskhuri: data.alphabets.nuskhuri.join(''),
            mtavruli: data.alphabets.mtavruli.join(''),
        },

        lorem : {
            firstNames : data.fnames,
            lastNames : data.lnames,
            words : data.vefxwords
        }
    },
};


export {core, lorem, toolkit, data}
export default anbani
