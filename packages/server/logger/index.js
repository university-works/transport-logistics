const requireModules = require('../utils/require-modules.utils');

const fns = {
  logger: 'logger',
  'wrap.logger': 'wrapLogger',
};

module.exports = requireModules(__dirname)(fns);
