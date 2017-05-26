'use strict';

const h = require('../interface/option.h');

h.prototype.and = function($optb) {
    if (this.isNone()) {
        return this;
    }

    return $optb;
};
