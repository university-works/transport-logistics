const { wrapChanceMethods, wrapChance } = require('../utils/index');

const options = {
  full: true,
};

const generateCountry =
  (params) =>
  ({ name = wrapChanceMethods.country(params, wrapChance) } = {}) => ({
    name,
  });

module.exports = generateCountry(options);
