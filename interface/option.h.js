'use strict';

//                                          ...
//                       s,                .                    .s
//                        ss,              . ..               .ss
//                        'SsSs,           ..  .           .sSsS'
//                         sSs'sSs,        .   .        .sSs'sSs
//                          sSs  'sSs,      ...      .sSs'  sSs
//                           sS,    'sSs,         .sSs'    .Ss
//                           'Ss       'sSs,   .sSs'       sS'
//                  ...       sSs         ' .sSs'         sSs       ...
//                 .           sSs       .sSs' ..,       sSs       .
//                 . ..         sS,   .sSs'  .  'sSs,   .Ss        . ..
//                 ..  .        'Ss .Ss'     .     'sSs. ''        ..  .
//                 .   .         sSs '       .        'sSs,        .   .
//                  ...      .sS.'sSs        .        .. 'sSs,      ...
//                        .sSs'    sS,     .....     .Ss    'sSs,
//                     .sSs'       'Ss       .       sS'       'sSs,
//                  .sSs'           sSs      .      sSs           'sSs,
//               .sSs'____________________________ sSs ______________'sSs,
//            .sSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'.Ss SSSSSSSSSSSSSSSSSSSSSs,
//                                    ...         sS'
//                                     sSs       sSs
//                                      sSs     sSs
//                                       sS,   .Ss
//                                       'Ss   sS'
//                                        sSs sSs
//                                         sSsSs
//                                          sSs
//                                           s

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
