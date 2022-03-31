const Chance = require('chance');
const { call, construct, curry } = require('ramda');

/** @: wrapChance :: params -> chance(params) */
const wrapChance = curry(call(construct(Chance)));

module.exports = wrapChance({});
