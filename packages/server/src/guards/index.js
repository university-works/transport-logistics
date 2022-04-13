const { requireModules } = require('../../utils/index');

const fns = {
  'auth-verify.guard': 'authVerify',
  'check-role.guard': 'checkRole',
};

module.exports = requireModules(__dirname)(fns);
