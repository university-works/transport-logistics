const { requireModules } = require('../../../utils/index');

const fns = {
  'wrap-base.wrapper': 'wrapBase',
};

module.exports = requireModules(__dirname)(fns);
