const { wrapChanceMethods, wrapChance } = require('../utils/index');

const generateUser = ({
  name = wrapChanceMethods.name({ middle_initial: true }, wrapChance),
  password = wrapChanceMethods.sentence({}, wrapChance),
  last_login = wrapChanceMethods.date({}, wrapChance),
} = {}) => ({
  name,
  password,
  last_login,
});

module.exports = generateUser;
