const { converge, equals, head, pipe, sort, comparator, gt } = require('ramda');

/** @: headEqualsGreatest :: List -> Boolean */
const headEqualsGreatest = converge(equals, [
  head,
  pipe(sort(comparator(gt)), head),
]);

module.exports = headEqualsGreatest;
