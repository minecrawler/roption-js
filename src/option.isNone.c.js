'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.isNone = function() {
    return !this[sym.state.isSome];
};
