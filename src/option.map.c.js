'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.map = function($f) {
    if (this.isSome()) {
        this[sym.value] = $f(this[sym.value]);
    }

    return this;
};
