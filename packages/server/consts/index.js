const requireModules = require('../utils/require-modules.utils');

const fns = {
  'tenant-roles.const': 'TENANT_ROLES',
};

module.exports = requireModules(__dirname)(fns);
