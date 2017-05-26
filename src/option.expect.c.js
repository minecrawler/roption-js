'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.expect = function($msg) {
    if (this.isNone()) {
        throw new Error($msg.toString());
    }

    return this[sym.value];
};
