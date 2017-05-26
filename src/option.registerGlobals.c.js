'use strict';

const h = require('../interface/option.h');


let initialized = false;

h.registerGlobals = function() {
    if (initialized) {
        return;
    }

    global.Some = h.fromSome;
    global.None = h.fromNone;
    initialized = true;
};
