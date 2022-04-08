const { curry, is } = require('ramda');
const mapOver = require('../map-over.utils');
const notEmpty = require('../not-empty.utils');
const wheaterObject = require('../wheater-object.utils');

/** @: left :: view -> fn -> ...args -> map over view */
const left = curry((view, fn, params) => async () => {
  const awaiter = await fn(params);
  if (is(Array)(awaiter)) {
    return mapOver(view)(awaiter);
  }
  return wheaterObject(view)(awaiter);
});

/** @: right :: view -> fn -> ...args -> map over view */
const right = curry((view, fn, params) => async (filter) => {
  if (notEmpty(filter)) {
    return mapOver(view)(await fn({ condition: filter }));
  }
  return mapOver(view)(await fn(params));
});

module.exports = { left, right };
