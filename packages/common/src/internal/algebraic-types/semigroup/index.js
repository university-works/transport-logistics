/**
 * @if combining this of semigroups
 *
 * @semigroup is a type with concat method with is associative
 * @example string is a semigroup because it has concat method
 * @name semigroup comes from abstract algebra
 */

const all = require('./all');
const first = require('./first');
const sum = require('./sum');
const intersection = require('./intersection');

module.exports = {
  all,
  first,
  sum,
  intersection,
};
