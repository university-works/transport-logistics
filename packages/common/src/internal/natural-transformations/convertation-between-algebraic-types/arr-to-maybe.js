const { Maybe } = require('ramda-fantasy');
const { pipe, identity } = require('ramda');

/** @: arrayToMaybe :: [a] -> Maybe a */
const arrayToMaybe = pipe(identity, Maybe.toMaybe);

module.exports = arrayToMaybe;
