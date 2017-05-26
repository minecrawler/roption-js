'use strict';

const h = require('../interface/option.h');
const sym = require('../interface/option-sym.h');

h.prototype.iter = function() {
    const self = this;
    return {
        [Symbol.iterator]: function* () {
            if (self.isSome()) {
                yield self[sym.value];
            }
        },
    };
};
