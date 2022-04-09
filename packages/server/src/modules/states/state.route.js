const { captureRoutesMeta } = require('../../services/index');
const { stateRepository } = require('../../repos/index');
const { asyncWrap } = require('../../../utils/express/index');

const stateCtrl = require('./state.controller');
const stateView = require('./state.view');

const key = 'state';

const meta = {
  get: {
    '/count': stateCtrl.count,
    '/log-action': stateCtrl.logAction,
    '/log-entity': stateCtrl.logEntity,
  },
  post: {
    '/test': (req, res) => res.send(req.body),
    '/same': asyncWrap(async (req) => req.body),
  },
};

module.exports = captureRoutesMeta(stateView, stateRepository, key, meta);
