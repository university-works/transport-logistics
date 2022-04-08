const { view } = require('../../../utils/index');

const exclude = ['password'];

module.exports = view(...exclude);
