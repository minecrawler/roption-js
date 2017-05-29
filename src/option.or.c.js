'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.or = function($optb) {
    if (this.isNone()) {
        return $optb;
    }

    return this[sym.value];
};
