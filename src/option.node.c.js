'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.node = function($f) {
    if (typeof $f === 'function') {
        $f(
            this.isSome() ? null : true,
            this.isNone() ? null : this[sym.value]
        );
    }
};
