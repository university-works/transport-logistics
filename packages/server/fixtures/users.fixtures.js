const { wrapChanceMethods, wrapChance } = require('../utils/index');

const options = {
  name: { middle_initial: true },
  email: { domain: 'example.com' },
  sentence: {},
  date: {},
};

const generateUser =
  (options) =>
  ({
    name = wrapChanceMethods.name(options.name, wrapChance),
    password = wrapChanceMethods.sentence(options.sentence, wrapChance),
    last_login = wrapChanceMethods.date(options.date, wrapChance),
    email = wrapChanceMethods.email(options.email, wrapChance),
  } = {}) => ({
    name,
    password,
    last_login,
    email,
  });

module.exports = generateUser(options);
