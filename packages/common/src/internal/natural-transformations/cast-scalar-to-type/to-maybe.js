const { Maybe } = require('ramda-fantasy');
const { compose, identity, construct } = require('ramda');

/** @: idToMaybe :: Identity a -> Maybe a */
const toMaybe = compose(Maybe.toMaybe, identity);

/** @: maybe :: Value -> Maybe Nothing Value  */
const maybe = compose(construct(Maybe), identity);

module.exports = { toMaybe, maybe };
