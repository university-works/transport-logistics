const requireModules = require('../require-modules.utils');

const swagger = {
  'dirname.utils': 'dirname',
  'fold-p.utils': 'foldP',
  'path.utils': 'path',
};

module.exports = requireModules(__dirname)(swagger);
