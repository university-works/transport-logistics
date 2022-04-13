const { curry } = require('ramda');
const logger = require('./logger');

/** @: wrapLogger :: ...args -> stdin */
const wrapLogger = curry((logger, method, value) => logger[method](value));

module.exports = wrapLogger(logger);
