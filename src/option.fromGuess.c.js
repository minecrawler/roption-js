'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.fromGuess = function($val) {
    if (
        typeof $val === 'undefined'
        || $val === null
        || $val.toString() === 'NaN'
    ) {
        return h.fromNone();
    }

    if (
        Array.isArray($val)
        && $val.length <= 0
    ) {
        return h.fromNone();
    }

    return h.fromSome($val);
};
