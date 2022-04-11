const { captureCtrlMeta } = require('../../../utils/controller/index');
const userService = require('./user.service');

const meta = {
  // onCall: ['count', 'logAction', 'logEntity'],
  onCall: ['count', 'logAction', 'logEntity', 'tryPost'],
};

const userCtrl = captureCtrlMeta(userService, 'onCall');

module.exports = userCtrl(meta);
