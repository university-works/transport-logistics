const wrap =
  (f, ...args) =>
  () =>
    f(...args);

module.exports = wrap;
