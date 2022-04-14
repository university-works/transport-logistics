const { curry } = require('ramda');

/** @: appUseAsItIs :: fn -> params, app -> app use ...fn(params) */
const appUseAsItIs = (toUse) =>
  curry((params, app) => app.use(...toUse(params)));

module.exports = appUseAsItIs;
