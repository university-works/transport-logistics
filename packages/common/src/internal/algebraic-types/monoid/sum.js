/**
 * @sum is a monoid if it has concat method(that is a semigroup)
 * @and it has empty function on it that will return a special type here
 * @returns special type(sum) with the neutral element(0 if number)
 */

/**
 * 2 + 0 = 2
 * x + 0 = x
 * 1 + 0 = 1
 *
 * @semigroup is a type with concat method. And if addition(+) is our concatination, we have netural
 * element 0 that acts as identity(x => x) and gives us back element(0) we are trying to concat
 *
 * @So if we have a special element like 0 here under addition(+) - we have what is called '@monoid'
 * @That is a @semigroup with a special element in here that acts like a neutral identity
 *
 */

/**
 * @here 0 and true is neutral elements for sum fns
 */

const { sum } = require('../semigroup');

const sumMonoid = sum;
sumMonoid.empty = () => sumMonoid(0);

module.exports = sumMonoid;
