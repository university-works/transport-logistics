/**
 * @const id = x => x
 */

const identity = (x) => ({
  map: (f) => identity(f(x)),
  inspect: () => `identity(${x})`,
  chain: (f) => f(x),
  ap: (f) => f.map((v) => x(v)),
  join: () => x,
});

module.exports = identity;
