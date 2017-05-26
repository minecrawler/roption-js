'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.orElse = function($f) {
    if (this.isNone()) {
        return $f();
    }

    return this[sym.value];
};
