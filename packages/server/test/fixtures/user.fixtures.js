const { set, lensProp } = require('ramda');
const { generateUser } = require('../../fixtures');
const { randomInt } = require('../utils');

const created = generateUser();

const onUpdate = set(lensProp('id'), randomInt(10));
const updated = onUpdate(created);

module.exports = {
  created,
  updated,
};
