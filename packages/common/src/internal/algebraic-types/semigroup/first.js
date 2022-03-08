/**
 * @first always return first
 */

const first = (x) => ({
  x,
  concat: ({ x: y }) => first(x),
  inspect: () => `first(${x})`,
});

module.exports = first;
