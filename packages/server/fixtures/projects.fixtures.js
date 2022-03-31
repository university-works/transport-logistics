const { wrapChanceMethods, wrapChance } = require('../utils/index');

const generateProject = ({
  name = wrapChanceMethods.hashtag(wrapChance),
} = {}) => ({
  name,
});

module.exports = generateProject;
