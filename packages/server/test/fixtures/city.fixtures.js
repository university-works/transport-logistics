const { set, lensProp } = require('ramda');
const { generateCity } = require('../../fixtures');
const { randomInt } = require('../utils');

const created = generateCity();

const onUpdate = set(lensProp('id'), randomInt(10));
const updated = onUpdate(created);

module.exports = {
  created,
  updated,
};
