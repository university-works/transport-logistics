const { wrapChanceMethods, wrapChance } = require('../utils/index');

const { address, postcode } = wrapChanceMethods;

const options = {};

const generateAddress =
  (params) =>
  ({
    address_line_one = address(params, wrapChance),
    address_line_two = address(params, wrapChance),
    postal_code = postcode(wrapChance),
  } = {}) => ({
    address_line_one,
    address_line_two,
    postal_code,
  });

module.exports = generateAddress(options);
