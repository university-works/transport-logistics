const requireModules = require('../../utils/require-modules.utils');

const fns = {
  'state.repository': 'stateRepository',
  'user.repository': 'userRepository',
  'role.repository': 'roleRepository',
  'scope.repository': 'scopeRepository',
  'role-scope.repo': 'roleScopeRepository',
  'user-role.repo': 'userRoleRepository',
  'scheduler-log.repository': 'schedulerLogRepository',
};

module.exports = requireModules(__dirname)(fns);
