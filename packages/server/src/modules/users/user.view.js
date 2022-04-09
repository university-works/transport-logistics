const { view } = require('../../../utils/view/index');

const exclude = ['password'];

module.exports = view(...exclude);
