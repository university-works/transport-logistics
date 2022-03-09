const {
  pipe,
  flip,
  prop,
  over,
  lensPath,
  compose,
  uniq,
  append,
  curry,
} = require('ramda');
const constant = require('./constant');

/** @: closureContext :: Field -> Object -> Object[Value] */
const closureContext = pipe(flip(prop), constant);

/** @: appendUniq :: Error -> Log -> Log Err */
const appendUniq = curry((err, log) => {
  const getObjectValue = closureContext(err);
  const logLens = lensPath([getObjectValue('field'), constant('errors')]);
  const setErrorMessage = curry(compose(uniq, append));
  return over(logLens, setErrorMessage(getObjectValue('message')), log);
});

module.exports = appendUniq;
