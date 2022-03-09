const { identity } = require('ramda');
const { toEither } = require('../cast-scalar-to-type/to-ramda-either');

/** @: maybeToEither :: Maybe a -> Either Left Right a  */
const maybeToEither = (maybe) =>
  toEither('Maybe Noting', maybe.chain(identity));

module.exports = maybeToEither;
