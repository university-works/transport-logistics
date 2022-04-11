const requireModules = require('../../utils/require-modules.utils');

const domainSpecific = {
  'domain-specific/auth.use-case': 'AUTH_USE_CASE_RECORD',
  'domain-specific/change-event.use-case': 'CHANGE_EVENT_USE_CASE_RECORD',
  'domain-specific/confirmation.use-case': 'CONFIRMATION_USE_CASE_RECORD',
  'domain-specific/credential.use-case': 'CREDENTIAL_USE_CASE_RECORD',
  'domain-specific/file.use-case': 'FILE_USE_CASE_RECORD',
  'domain-specific/integration.use-case': 'INTEGRATION_USE_CASE_RECORD',
  'domain-specific/sap.use-case': 'SAP_USE_CASE_RECORD',
  'domain-specific/user.use-case': 'USER_USE_CASE_RECORD',
};

module.exports = requireModules('./')(domainSpecific);
