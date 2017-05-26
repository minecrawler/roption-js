'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.take = function() {
    this[sym.state.isSome] = false;
    this[sym.value] = undefined;
    return this;
};
