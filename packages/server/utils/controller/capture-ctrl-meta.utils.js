const { set, lensProp, compose, reduce, prop, curry } = require('ramda');
const asyncWrap = require('../express/async-wrap.utils');
const castMethodReturnedValue = require('./cast-method-returned-value.utils');

/** @: handler -> service -> acc, key -> wrap async */
const handler = (service) => (acc, key) =>
  set(lensProp(key), asyncWrap(castMethodReturnedValue(service, {}, key)), acc);

/** @: captureCtrlMeta :: service -> field -> assoc based lens */
const captureCtrlMeta = curry((service, field) =>
  compose(reduce(handler(service), {}), prop(field)),
);

module.exports = captureCtrlMeta;
