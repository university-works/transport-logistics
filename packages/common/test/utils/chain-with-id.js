const { compose, curry } = require('ramda');
const toId = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-id');

/**
 * @return value inside functor
 */

/** @: chainWithId :: (a -> b) -> b */
const chainWithId = (fn) => curry(compose(toId, fn));

module.exports = chainWithId;
