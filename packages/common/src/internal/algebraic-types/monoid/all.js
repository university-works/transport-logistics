const { all } = require('../semigroup');

/**
 * @here true is neutral elements for all fns
 * true  && true  -> true
 * false && true  -> false
 * false && false -> false
 * false && true  -> false
 */

const allMonoid = all;
allMonoid.empty = () => allMonoid(true);

module.exports = allMonoid;
