const requireModules = require('../require-modules.utils');

const fns = {
  'view/columns.utils': 'columns',
  'view/view.utils': 'view',
};

module.exports = requireModules('./')(fns);
