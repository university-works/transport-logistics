const { wrapChanceMethods, wrapChance } = require('../utils/index');

const options = {
  territories: true,
  us_states_and_dc: true,
  full: true,
};

const generateState =
  (params) =>
  ({ name = wrapChanceMethods.state(params, wrapChance) } = {}) => ({
    name,
  });

module.exports = generateState(options);
