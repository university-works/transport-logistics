/**
 * @const either = right || left;
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
