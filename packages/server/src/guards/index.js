const { requireModules } = require('../../utils/index');

const fns = {
  'auth-verify.guard': 'authVerify',
};

module.exports = requireModules(__dirname)(fns);
