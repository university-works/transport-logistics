const { curry, compose, flip, prop } = require('ramda');
const appUse = require('./app-use.utils');

/** @: apFields :: object -> prop -> app use object[prop] */
const apFields = curry(compose(appUse, flip(prop)));

module.exports = apFields;
