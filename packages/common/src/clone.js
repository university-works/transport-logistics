const { compose, chain } = require('ramda');

const safeParse = require('./safe-parse');
const safeStringify = require('./safe-stringify');

/** clone :: String -> Either Left Err Right JSON */
const clone = compose(chain(safeParse), safeStringify);

module.exports = clone;
