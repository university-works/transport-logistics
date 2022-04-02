const { wrapChanceMethods, wrapChance } = require('../utils/index');

const { profession, birthday } = wrapChanceMethods;

const options = {};

const generateEmployee =
  (params) =>
  ({
    job_title = profession({}, wrapChance),
    birth_date = birthday({}, wrapChance),
    interview_date = birthday({}, wrapChance),
    hire_date = birthday({}, wrapChance),
  } = {}) => ({
    job_title,
    birth_date,
    interview_date,
    hire_date,
  });

module.exports = generateEmployee(options);
