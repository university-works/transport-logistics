const { wrapChanceMethods, wrapChance } = require('../utils/index');

const generateUser = ({
  name = wrapChanceMethods.name({ middle_initial: true }, wrapChance),
} = {}) => ({
  name,
});

module.exports = generateUser;
