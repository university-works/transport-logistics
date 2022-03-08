const { first } = require('../semigroup');

/**
 * @can not be monoid because behaviour not equivalent
 * @first('meta programming').concat(first(?)) -> 'meta programming', ? can be anything
 * @first(?).concat(first('another')) -> ?. Throw second part away 'another'
 *
 * first neutral element can not be defined, do not know how to do it
 * @first semigroup should remain @semigroup
 */

module.exports = first;
