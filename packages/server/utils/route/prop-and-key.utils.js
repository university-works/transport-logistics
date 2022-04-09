const { compose, prop } = require('ramda');
const toPassOver = require('./to-pass-over.utils');

/** @: propAndKey :: key -> wrap into entries */
const propAndKey = (key) => compose(toPassOver(key), prop(key));

module.exports = propAndKey;
