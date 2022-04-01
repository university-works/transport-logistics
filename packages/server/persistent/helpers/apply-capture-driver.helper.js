const { converge } = require('ramda');
const alwQ = require('./always-query.helper');

/** @: captureDriver :: driver -> query driver */
const captureDriver = (knex) => alwQ(knex);

/** @: ap :: params -> list */
const ap = (...args) => args;

/** @: applyCaptureDriver :: driver, params -> query select */
const applyCaptureDriver =
  (driver) =>
  (...params) =>
    converge(ap, [captureDriver(driver)(...params)]);

module.exports = applyCaptureDriver;
