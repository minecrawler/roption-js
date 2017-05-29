# roption-js
Rusty Monad Options for JS
---

[![Build Status](https://travis-ci.org/minecrawler/roption-js.svg?branch=master)](https://travis-ci.org/minecrawler/roption-js)
[![Coverage Status](https://coveralls.io/repos/github/minecrawler/roption-js/badge.svg)](https://coveralls.io/github/minecrawler/roption-js)
[![Known Vulnerabilities](https://snyk.io/test/github/minecrawler/roption-js/badge.svg)](https://snyk.io/test/github/minecrawler/roption-js)

Everyone knows that when dealing with data, sometimes there is nothing to pass or nothing to return.
Usually, in JS, we have to decide for either `undefined` or `null`, but also sometimes `NaN` and similar.

In order to simplify this problem, monadic options were created, which can either contain a value, or not.
One of the most prominent usages of such an option system is `core::option::Option` of the programming language Rust.

This module is based on the Rust implementation, but brings some changes in order to better use it in JS.
One of the major differences is that option-js uses lowerCamelCase instead of snake_case.
Additionally, the methods involving `std::result::Result` were not implemented, since they require a Result-dependency.

`roption-js` does not have any dependencies and conducts unit tests and coverage with `TAP` and `coveralls`.

**You can find the complete API, as defined in code, below the examples!**


## Installation

    npm i roption-js --save


## Simple Example

In the following example, you can see that the traditional way needs a lot more LoC and might lead to errors.
The Option Monad helps to clean this mess up!

For more simple examples, please take a look at `./test.js`, on which Travis CI and Coveralls tests are based!

```js
'use strict';

// Traditional way

readFromDB(rows => {
  // would you remember to check this in every situation?
  if (
    typeof rows !== 'undefined' &&
    rows !== null &&
    rows.length > 0
  ) {
    return;
  }

  processDBRow(rows[0]);
});


// -------------------------------------
// With Option


const Option = require('roption-js');

readFromDB(result => {
  const rows = Option.fromGuess(result);
  if (rows.isSome()) {
    processDBRow(rows.unwrap()[0]);
  }
});
```


## Usage

### Create new Result

```js
'use strict';

const Option = require('roption-js');

const hasSome = Option.fromSome('YaY');
const hasNone = Option.fromNone();

// ...
```


### Register Some() and None()

```js
// ...

// After the following line, Some() and None() will be available on a global level.
// That means that you can do stuff, like
//     return Some(val);
//     return None();
Option.registerGlobals();

// ...
```


### Check if contains value

```js
// ...

if (hasSome.isSome() || !hasSome.isNone()) { console.log('Option is Some; this will be visible!'); }
if (hasNone.isNone() || !hasNone.isSome()) { console.log('Option is None; this will _not_ be visible!'); }

// ...
```


### Get Value

```js
// ...

// `unwrap` will throw if the Option is None
var myResult = hasSome.unwrap();

// `expect` will also throw if the Option is None, but add a message
myResult = hasSome.expect('uh oh!');

// `and` will return the passed value instead of the Some-value if the Option is not None
myResult = hasSome.and('SURPRISE!');
myResult = hasSome.andThen(res => res + ' for Result!');


// `or` will return the passed value in case the Option is None
myResult = hasNone.or('some value');
myResult = hasNone.orElse(() => 'a value~');

// Or just a very simple match
hasNone.match(val => {
  console.log('Since we use the `hasNone` Option, this message will never be visiable!');
}, () => {
  console.log('This message will be visible!');
});
```


## API

All methods work just as described in the [Rust documentation](https://doc.rust-lang.org/core/option/enum.Option.html).
The interface below includes Exceptions, however all methods are fully implemented and will not throw.
The Exceptions are in place in order to provide you a clear, non-cluttered API overview.

```js
/**
 * Rusty Monad Options for JS
 *
 * @type {Option}
 */
module.exports = class Option {
    /**
     * Construct a new Option Object from a value as Some(value)
     * If no value is passed, the option will contain None
     *
     * @param {boolean} isSome
     * @param {*} val
     */
    constructor(isSome, val) { this._init(isSome, val); };

    /**
     * Create Some(val)
     *
     * @param {*} val
     * @returns {Option}
     */
    static fromSome(val) { return new Option(true, val); };

    /**
     * Create None
     *
     * @returns {Option}
     */
    static fromNone() { return new Option(false, null); };

    /**
     * Create an Option from a value.
     * An algorithm takes a guess if it should be a Some or a None.
     * Empty arrays will be transformed to None
     *
     * @param {*} val
     * @returns {Option}
     */
    static fromGuess(val) { throw new Error ('Not Implemented: Option.fromGuess'); };

    /**
     * Register Some and None on a global scope
     */
    static registerGlobals() { throw new Error ('Not Implemented: Option.registerGlobals'); };

    /**
     * Returns true if the option is a Some value.
     *
     * @returns {boolean}
     */
    isSome() { throw new Error ('Not Implemented: Option.isSome'); };

    /**
     * Returns true if the option is a None value.
     *
     * @returns {boolean}
     */
    isNone() { throw new Error ('Not Implemented: Option.isNone'); };

    /**
     * Unwraps an option, yielding the content of a Some.
     *
     * @throws if the value is a None with a custom panic message provided by msg.
     * @param {string} msg
     * @returns {*}
     */
    expect(msg) { throw new Error ('Not Implemented: Option.expect'); };

    /**
     * Moves the value v out of the Option<T> if it is Some(v).
     * In general, because this function may panic, its use is discouraged.
     * Instead, prefer to use pattern matching and handle the None case explicitly.
     *
     * @throws if the self value equals None.
     * @returns {*}
     */
    unwrap() { throw new Error ('Not Implemented: Option.unwrap'); };

    /**
     * Maps an Option<T> to Option<U> by applying a function to a contained value.
     *
     * @param {OptionMap} f
     * @returns {Option}
     */
    map(f) { throw new Error ('Not Implemented: Option.map'); };

    /**
     * Returns an iterator over the possibly contained value.
     *
     * @returns {Iterable.<*>}
     */
    iter() { throw new Error ('Not Implemented: Option.iter'); };

    /**
     * Returns None if the option is None, otherwise returns optb.
     *
     * @param {*} optb
     * @returns {*}
     */
    and(optb) { throw new Error ('Not Implemented: Option.and'); };

    /**
     * Returns None if the option is None, otherwise calls f with the wrapped value and returns the result.
     *
     * @param {OptionAndThenHandler} f
     * @returns {*}
     */
    andThen(f) { throw new Error ('Not Implemented: Option.andThen'); };

    /**
     * Returns the option if it contains a value, otherwise returns optb.
     *
     * @param {*} optb
     * @returns {*}
     */
    or(optb) { throw new Error ('Not Implemented: Option.or'); };

    /**
     * Returns the option if it contains a value, otherwise calls f and returns the result.
     *
     * @param {OptionOrElseHandler} f
     * @returns {*}
     */
    orElse(f) { throw new Error ('Not Implemented: Option.orElse'); };

    /**
     * Takes the value out of the option, leaving a None in its place.
     *
     * @returns {Option}
     */
    take() { throw new Error ('Not Implemented: Option.isSome'); };

    /**
     * JS convenience method then-like handler for pattern-matching
     *
     * @param {OptionSomeHandler} someHandler
     * @param {OptionNoneHandler} noneHandler
     */
    match(someHandler, noneHandler) { throw new Error ('Not Implemented: Option.match'); };

    /**
     * JS convenience method to handle a result NodeJS-style
     * Example:
     * Option.fromNone().node((err, val) => {
     *   // do sth.
     * });
     *
     * @param {OptionNodeJSStyleHandler} f
     */
    node(f) { throw new Error ('Not Implemented: Option.node'); };
};

/**
 * This Callback is used to map over an Option
 *
 * @callback OptionMap
 * @param {*} val
 *   `val` will contain the Some-part of {Option}.
 * @returns {*} New Some-part
 */

/**
 * This Callback is used to handle andThen calls
 *
 * @callback OptionAndThenHandler
 * @param {*} val
 *   `val` will contain the Some-part of {Option}.
 * @returns {*}
 */

/**
 * This Callback is used to handle orElse calls
 * It has to generate a new value
 *
 * @callback OptionOrElseHandler
 * @returns {*}
 */

/**
 * This Callback is used to handle pattern-matching calls
 *
 * @callback OptionSomeHandler
 * @param {*} val
 *   `val` will contain the Some-part of {Option}.
 * @returns {*}
 */

/**
 * This Callback is used to handle pattern-matching calls
 *
 * @callback OptionNoneHandler
 * @returns {*}
 */

/**
 * This callback is used as NodeJS-style handler
 *
 * @callback OptionNodeJSStyleHandler
 * @oaram {*} err true if Option contains None, else it's null
 * @param {*} val contains Some-part, else it's null
 */
```
