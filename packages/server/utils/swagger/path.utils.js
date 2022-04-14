const { partial } = require('ramda');
const { resolve } = require('path');

const path = partial(resolve, [process.cwd()]);

module.exports = path;
