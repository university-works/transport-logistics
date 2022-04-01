const requireModules = require('../utils/require-modules.utils');

const fns = {
  'tenant-roles.const': 'TENANT_ROLES_RECORD',
  'tenant-entries.const': 'TENANT_ENTRIES_RECORD',
  'tenant-rights.const': 'TENANT_RIGHTS_RECORD',
  'tenant-scopes.const': 'TENANT_SCOPES_RECORD',
};

module.exports = requireModules(__dirname)(fns);
