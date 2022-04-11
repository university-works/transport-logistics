const { captureRoutesMeta } = require('../../services/index');
const { scopeRepository } = require('../../repos/index');

const scopeCtrl = require('./scope.controller');
const scopeView = require('./scope.view');

const key = 'scope';

const meta = {
  get: {
    '/count': scopeCtrl.count,
  },
};

module.exports = captureRoutesMeta(scopeView, scopeRepository, key, meta);
