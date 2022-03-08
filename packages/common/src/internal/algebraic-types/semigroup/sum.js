/**
 * @create sum type to capture addition operation
 * @sum :: 1 + (1 + 1) = (1 + 1) + 1
 * @associative example
 */

const sum = (x) => ({
  x,
  concat: ({ x: y }) => sum(x + y),
  inspect: () => `sum(${x})`,
});

module.exports = sum;
