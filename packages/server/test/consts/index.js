const requireModules = require('../../utils/require-modules.utils');

const errors = {
  'http-status-codes.errors': 'HTTP_STATUS_CODES',
};

module.exports = requireModules(__dirname)(errors);
