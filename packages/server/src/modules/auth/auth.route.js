const { withoutRepositoryUsed } = require('../../../utils/route/index');
const { captureRoutesMeta } = require('../../services/index');

const authCtrl = require('./auth.controller');
const authView = require('./auth.view');

const key = 'auth';

const meta = {
  post: {
    '/register': authCtrl.register,
    '/login': authCtrl.login,
    '/logout': authCtrl.logout,
    '/refresh-access-token': authCtrl.refreshAccessToken,
  },
};

module.exports = captureRoutesMeta(
  authView,
  withoutRepositoryUsed('auth'),
  key,
  meta,
);
