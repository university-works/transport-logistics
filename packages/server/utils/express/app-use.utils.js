const { curry } = require('ramda');

/** @: appUse :: fn -> params, app -> app use fn(params) */
const appUse = (toUse) => curry((params, app) => app.use(toUse(params)));

module.exports = appUse;
