const { partial } = require('ramda');
const { resolve, dirname: dir } = require('path');

const dirname = (filePath) => partial(resolve, [dir(filePath)]);

module.exports = dirname;
