const { reverse } = require('../semigroup');

/**
 * @here [] is neutral elements for reverse fns
 */

const reverseMonoid = reverse;
reverseMonoid.empty = () => reverseMonoid([]);

module.exports = reverseMonoid;
