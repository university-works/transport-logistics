const { captureCtrlMeta } = require('../../../utils/controller/index');
const authService = require('./auth.service');

const meta = {
  onCall: ['register', 'login', 'logout', 'refreshAccessToken'],
};

const authCtrl = captureCtrlMeta(authService, 'onCall');

module.exports = authCtrl(meta);
