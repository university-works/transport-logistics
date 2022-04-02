const { wrapChanceMethods, wrapChance } = require('../utils/index');

const generateNote = ({
  note = wrapChanceMethods.sentence({}, wrapChance),
} = {}) => ({
  note,
});

module.exports = generateNote;
