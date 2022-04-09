const { curry, set, lensProp, reduce } = require('ramda');
const callOnProp = require('./call-on-prop.utils');

/** @: base :: (a -> b) -> instance -> acc, prop -> assoc mapped value */
const base = curry(
  (over, repo) => (acc, field) => set(lensProp(field), over(field, repo), acc),
);

/** @: apRepoMethod :: instance -> map instance methods */
const apRepoMethod = (repository) => reduce(base(callOnProp, repository), {});

module.exports = apRepoMethod;
