'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.andThen = function($f) {
    if (this.isNone()) {
        return this;
    }

    return $f(this[sym.value]);
};
