/**
 * @all
 * @lets create a new type to capture this conjunction
 * true && false -> false
 * true && true  -> true
 */

const all = (x) => ({
  x,
  concat: ({ x: y }) => all(x && y),
  inspect: () => `all(${x})`,
});

module.exports = all;
