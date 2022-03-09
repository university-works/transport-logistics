/**
 * @const either = right || left;
 */

/** @Error Handling */

/**
 * @Left behaves like a teenager, he ignores our attempts to make him work with map.
 * @And Right will work exactly like Container (a.k.a Identity).
 *
 * @The power lies in being able to put the error message inside Left
 * @We can also use Maybe.Nothing to handle errors in programms,
 * @but it will be not informative. Because we can have many errors
 */

const right = (x) => ({
  map: (f) => right(f(x)),
  inspect: () => `right(${x})`,
  chain: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
});

const left = (x) => ({
  map: (f) => left(x),
  inspect: () => `left(${x})`,
  chain: (f) => x,
  ap: (f) => f.map((v) => v),
  left: true,
});

const either = (f) => (g) => (e) => {
  if (e.left) return e.fold((v) => f(v));
  return e.fold((v) => g(v));
};

module.exports = { right, left, either };
