const requireModules = require('../../utils/require-modules.utils');

const fns = {
  'state.repository': 'stateRepository',
  'user.repository': 'userRepository',
};

module.exports = requireModules(__dirname)(fns);
