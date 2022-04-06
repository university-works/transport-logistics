const express = require('express');
const router = express.Router();
const { resolve } = require('path');

const { requireModules } = require('../../utils/index');

const fns = {
  'users/user.route': 'users',
  'states/state.route': 'states',
};

const routes = requireModules(resolve(__dirname, '../modules'))(fns);

module.exports = { router, routes };
