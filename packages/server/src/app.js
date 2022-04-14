const { cast } = require('@fp/common');
const { call, compose, map } = require('ramda');
const bodyParser = require('body-parser');

const { future } = cast;

const express = future(require('express'));
const { setUpRoutes, serveOpenapi } = require('./services/index');
const { config } = require('../config/index');
const rs = require('./routes');

const { apFields, appUse, appUseAsItIs } = require('../utils/express/index');
const { path } = require('../utils/swagger/index');

const apBodyParse = apFields(bodyParser);

const filePath = config.get('FILE_PATH');

const app = compose(
  appUse(setUpRoutes(rs.router))(rs.routes),
  appUseAsItIs(serveOpenapi)(path(filePath)),
  apBodyParse('json')({}),
  apBodyParse('urlencoded')({ extended: false }),
  call,
);

module.exports = map(app)(express);
