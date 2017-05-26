'use strict';

const sym = require('../interface/option-sym.h');


require('../interface/option.h').prototype._init = function($isSome, $val) {
    this[sym.state.isSome] = $isSome;
    this[sym.value] = $isSome ? $val : null;
};
