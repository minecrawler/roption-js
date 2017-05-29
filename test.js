#!/usr/bin/env node

'use strict';

const TAP = require('tap');


TAP.test('Test interface', $t => {

    const _interface = require('./interface/option.h');
    require('./src/option._init.c');
    const tmp = new _interface('');

    const funs = Object.getOwnPropertyNames(_interface).concat(Object.getOwnPropertyNames(_interface.prototype));

    $t.plan(funs.length);

    funs.forEach($fun => {

        if ($fun === 'constructor' || $fun === '_init') {

            $t.pass($fun + ' is always defined');
            return;
        }

        if (typeof tmp[$fun] === 'function') {

            $t.throws(tmp[$fun].bind(tmp), 'Check Interface ' + $fun + ' throw');
            return;
        }

        if (typeof _interface[$fun] === 'function') {

            if (['fromSome', 'fromNone'].indexOf(_interface[$fun].name) >= 0) {
                $t.pass('inline implementation');
                return;
            }

            $t.throws(_interface[$fun].bind(tmp), 'Check Interface ' + $fun + ' throw');
            return;
        }

        $t.pass($fun + ' is not a function');
    });

    $t.end();
});


const Option = require('.');

TAP.test('Create Options', $t => {

    $t.plan(4);

    $t.ok(Option.fromNone(), 'Create Option from None');
    $t.ok(Option.fromSome('TEST'), 'Create Option from Some');
    $t.ok(Option.fromGuess('TEST'), 'Create Option from Guess');
    $t.ok((new Option()).isNone(), 'Create Option with neither val nor err');

    $t.end();
});

TAP.test('Some() Tests', $t => {

    $t.plan(14);

    const s = Option.fromSome('TEST');

    $t.ok(s.isSome(), 'Some.isSome');
    $t.notOk(s.isNone(), '!Some.notOk');

    $t.equal(s.unwrap(), 'TEST', 'Check Some.unwrap');
    $t.equal(s.expect(''), 'TEST', 'Check Some.expect');
    $t.equal(s.and('NYAN'), 'NYAN', 'Check Some.and');
    $t.equal(s.andThen($v => $v.toString() + '2'), 'TEST2', 'Check Some.andThen');
    $t.equal(s.or('FAIL'), 'TEST', 'Check Some.or');
    $t.equal(s.orElse(() => '2'), 'TEST', 'Check Some.orElse');
    s.node((err, val) => {
        $t.equal(err, null, 'Check None.node none');
        $t.equal(val, 'TEST', 'Check None.node some');
    });

    s.match($val => {

        $t.equal($val, 'TEST', 'Check Some.match');
    }, () => {

        $t.fail('Check Some.match');
    });

    $t.ok(Option.fromGuess(Math.random()).isSome(), 'Check Option.fromGuess from number');
    $t.ok(Option.fromGuess('Hellow').isSome(), 'Check Option.fromGuess from string');
    $t.ok(Option.fromGuess([1,2,3, '']).isSome(), 'Check Option.fromGuess from array');

    $t.end();
});

TAP.test('None() Tests', $t => {

    $t.plan(15);

    const e = Option.fromNone();

    $t.notOk(e.isSome(), '!None.isSome');
    $t.ok(e.isNone(), 'None.notOk');

    $t.throws(e.unwrap.bind(e), 'Check None.unwrap');
    $t.throws(e.expect.bind(e, 'None'), 'Check None.expect');
    $t.equal(e.and('NYAN').isNone(), true, 'Check None.and');
    $t.equal(e.andThen($v => $v.toString() + '2').isNone(), true, 'Check None.andThen');
    $t.equal(e.or('FAIL'), 'FAIL', 'Check None.or');
    $t.equal(e.orElse(() => '2').toString(), '2', 'Check None.orElse');
    e.node((err, val) => {
        $t.equal(err, true, 'Check None.node none');
        $t.equal(val, null, 'Check None.node some');
    });

    e.match(() => {

        $t.fail('Check None.match');

    }, () => {

        $t.pass('Check None.match');
    });

    $t.ok(Option.fromGuess(null).isNone(), 'Check Option.fromGuess from null');
    $t.ok(Option.fromGuess(undefined).isNone(), 'Check Option.fromGuess from undefined');
    $t.ok(Option.fromGuess([]).isNone(), 'Check Option.fromGuess from empty array');
    $t.ok(Option.fromGuess(NaN).isNone(), 'Check Option.fromGuess from NaN');

    $t.end();
});

TAP.test('Control Flow Tests', $t => {

    $t.plan(7);

    const sq = $x => Option.fromSome($x * $x);
    const err = $x => Option.fromNone();

    $t.equal(Option.fromSome(2).orElse(sq), 2, 'Some.orElse Test sq');
    $t.equal(Option.fromSome(2).andThen(sq).orElse(sq), 4, 'Some.andThen.orElse Test sq sq');
    $t.equal(Option.fromSome(2).andThen(err).or(13), 13, 'Some.andThen.orElse Test err sq');
    $t.equal(Option.fromSome(2).andThen(sq).orElse(err), 4, 'Some.andThen.orElse Test sq err');
    $t.equal(Option.fromSome(2).andThen(err).orElse(err).or(13), 13, 'Some.andThen.orElse.unwrap Test err err');

    $t.equal(Option.fromNone().orElse(() => 9), 9, 'None.orElse.unwrap Test sq');
    $t.equal(Option.fromNone().andThen(sq).isNone(), true, 'None.andThen Test sq');

    $t.end();
});

TAP.test('Globals Tests', $t => {

    $t.plan(5);

    Option.registerGlobals();

    Some._test = true;
    Option.registerGlobals();
    $t.equal(Some._test, true, 'Check Globals Initialization');

    $t.equal(typeof Some, 'function', 'Check global.Some()');
    $t.equal(typeof None, 'function', 'Check global.None()');
    $t.ok(Some('test').isSome(), 'check global.Some isSome');
    $t.ok(None().isNone(), 'check global.None isNone');

    $t.end();
});

TAP.test('Misc Tests', $t => {

    $t.plan(8);

    const good = Option.fromSome('test');
    const bad = Option.fromNone();

    $t.equal(good.map($val => $val + '_ok').unwrap(), 'test_ok', 'Option.map Test on Ok');
    bad.map($val => $val + '_ok').match(() => {

        $t.fail('Option.map Test on Err');
    }, () => {

        $t.pass('Option.map Test on Err');
    });

    let c = 0;
    const goodIterArr = Array.from(good.iter());
    goodIterArr.forEach(() => c++);
    $t.equal(c, 1, 'Ok.iter() Test');

    c = 0;
    const badIterArr = Array.from(bad.iter());
    badIterArr.forEach(() => c++);
    $t.equal(c, 0, 'Err.iter() Test');

    const some = Option.fromSome('');
    $t.ok(some.take().isNone(), 'Check Some.take()');
    $t.ok(some.isNone(), 'Check if take is consuming its value');
    $t.ok(Option.fromNone().take().isNone(), 'Check None.take()');

    const originalWrite = process.stderr.write;
    process.stderr.write = $str => {
        $t.pass('Warn user about unset None-handler when using match');
        process.stderr.write = originalWrite;
    };

    bad.match();

    $t.end();
});
