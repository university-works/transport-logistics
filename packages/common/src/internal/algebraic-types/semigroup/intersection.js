/**
 * @intersection same name operations for sets
 */

const intersection = (xs) => ({
  xs,
  concat: ({ xs: ys }) =>
    intersection(xs.filter((x) => ys.some((y) => y === x))),
});

module.exports = intersection;
