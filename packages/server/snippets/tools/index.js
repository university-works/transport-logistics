const { requireModules } = require('../../utils/index');

const fns = {
  'construct-message.tool': 'constructMessage',
  'list-commands-with-env.tool': 'listCommandsWithEnv',
};

module.exports = requireModules(__dirname)(fns);
