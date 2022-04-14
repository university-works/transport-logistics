const { requireModules } = require('../../utils/index');

const test = {
  'identity.utils': 'identity',
  'end-as.utils': 'endAs',
  'jwt.utils': 'jwt',
  'random-int.utils': 'randomInt',
};

module.exports = requireModules(__dirname)(test);
