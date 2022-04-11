const {
  curry,
  call,
  over,
  lensProp,
  always,
  is,
  prop,
  compose,
  identity,
  set,
  chain,
} = require('ramda');

const { fns } = require('@fp/common');
const { notEmpty } = require('../../utils/index');

const { safeParse } = fns;

/** @: ajustReturned :: key -> entity -> map over lens prop */
const ajustReturned = curry((key, entity) => {
  if (is(Object, entity)) {
    return entity;
  }
  return over(lensProp(key), always(entity), {});
});

/** @: castMethodReturnedValue :: service ... key -> assoc lens based */
const castMethodReturnedValue = curry((service, params, key) => async (req) => {
  const getQueryFilter = compose(prop('filter'), prop('query'));

  const apFilter = (filter) => {
    const acc = {};

    if (!filter) {
      return acc;
    }
    const mapOver = compose(chain(identity), safeParse);
    return set(lensProp('condition'), mapOver(filter), acc);
  };

  const args = compose(apFilter, getQueryFilter);

  if (notEmpty(req.body)) {
    const entity = await call(service[key], req.body);
    return ajustReturned(key, entity);
  }
  const entity = await call(service[key], args(req));
  return ajustReturned(key, entity);
});

module.exports = castMethodReturnedValue;
