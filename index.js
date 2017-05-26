'use strict';

require('./src/option._init.c');
require('./src/option.and.c');
require('./src/option.andThen.c');
require('./src/option.expect.c');
require('./src/option.isNone.c');
require('./src/option.isSome.c');
require('./src/option.iter.c');
require('./src/option.map.c');
require('./src/option.match.c');
require('./src/option.node.c');
require('./src/option.or.c');
require('./src/option.orElse.c');
require('./src/option.registerGlobals.c');
require('./src/option.take.c');
require('./src/option.unwrap.c');

module.exports = require('./interface/option.h');
