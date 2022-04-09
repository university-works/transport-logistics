const { captureCtrlMeta } = require('../../../utils/controller/index');
const userService = require('./user.service');

const meta = {
  onCall: ['count', 'logAction', 'logEntity'],
};

const userCtrl = captureCtrlMeta(userService, 'onCall');

module.exports = userCtrl(meta);
