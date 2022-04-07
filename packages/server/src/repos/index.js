const requireModules = require('../../utils/require-modules.utils');

const fns = {
  'state.repository': 'stateRepository',
};

module.exports = requireModules(__dirname)(fns);
