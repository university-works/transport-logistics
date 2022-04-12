const { compose, split } = require('ramda');
const safeNth = require('./safe-nth.utils');

/** @: separateJwtToken :: String -> Either Message List[N] */
const separateJwtToken = compose(safeNth(1), split(' '));

module.exports = separateJwtToken;
