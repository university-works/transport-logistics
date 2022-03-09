const { identity } = require('ramda');
const { maybe } = require('../cast-scalar-to-type/to-maybe');

/** @: idToMaybe :: Identity a -> Maybe Noting Just a */
const idToMaybe = (id) => maybe(id.chain(identity));

module.exports = idToMaybe;
