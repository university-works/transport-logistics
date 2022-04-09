const { curry, call, over, lensProp, always, is } = require('ramda');

/** @: castMethodReturnedValue :: service ... key -> assoc lens based */
const castMethodReturnedValue = curry(
  (service, params, key) => async (req, res) => {
    const entity = await call(service[key], params);

    if (is(Object, entity)) {
      return entity;
    }
    return over(lensProp(key), always(entity), {});
  },
);

module.exports = castMethodReturnedValue;
