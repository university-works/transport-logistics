const { wrapChanceMethods, wrapChance } = require('../utils/index');

const options = {};

const generateCity =
  (params) =>
  ({ name = wrapChanceMethods.city(wrapChance) } = {}) => ({
    name,
  });

module.exports = generateCity(options);
