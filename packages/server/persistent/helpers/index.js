const { requireModules } = require('../../utils/index');

const fns = {
  'construct-query.helper': 'constructQuery',
  'always-query.helper': 'alwQ',
  'apply-capture-driver.helper': 'applyCaptureDriver',
  'get-random-value-in-vector.helper': 'getRandomValueInVector',
};

module.exports = requireModules(__dirname)(fns);
