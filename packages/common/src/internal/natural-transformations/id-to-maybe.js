const { Maybe } = require('ramda-fantasy');
const { compose, identity } = require('ramda');

/** @: idToMaybe :: Identity a -> Maybe a */
const idToMaybe = compose(Maybe.toMaybe, identity);

module.exports = idToMaybe;
