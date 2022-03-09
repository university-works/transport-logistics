/**
 * @reverse add element to first pointer
 */

const reverse = (xs) => ({
  xs,
  concat: ({ xs: ys }) => reverse([ys].concat(xs)),
});

module.exports = reverse;
