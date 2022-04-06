const { cast } = require('@fp/common');
const { call, compose, map } = require('ramda');
const bodyParser = require('body-parser');

const { future } = cast;

const express = future(require('express'));
const { setUpRoutes } = require('./services/index');
const rs = require('./routes');

const { apFields, appUse } = require('../utils/express/index');

const apBodyParse = apFields(bodyParser);

const app = compose(
  appUse(setUpRoutes(rs.router))(rs.routes),
  apBodyParse('json')({}),
  apBodyParse('urlencoded')({ extended: false }),
  call,
);

module.exports = map(app)(express);
