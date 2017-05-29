'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.match = function($someHandler, $noneHandler) {
    if (this.isNone()) {
        typeof $noneHandler === 'function' && $noneHandler();
    }
    else {
        typeof $someHandler === 'function' && $someHandler(this[sym.value]);
    }

    if (typeof $noneHandler !== 'function') {
        console.error(new Error('Unhandled None-case in Option.match expression!'));
    }
};
