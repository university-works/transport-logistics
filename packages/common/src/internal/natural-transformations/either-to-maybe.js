const { Maybe, Either } = require('ramda-fantasy');
const { construct } = require('ramda');

const noting = construct(Maybe.Nothing);
const just = construct(Maybe.Just);
const { either } = Either;

/** @: eitherToMaybe :: Either b a -> Maybe a */
const eitherToMaybe = either(noting, just);

module.exports = eitherToMaybe;
