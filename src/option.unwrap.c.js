'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.unwrap = function() {
    if (this.isNone()) {
        throw new Error('Cannot unwrap `None`!');
    }

    return this[sym.value];
};
