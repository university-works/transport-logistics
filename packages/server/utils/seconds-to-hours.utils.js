const { converge, divide, always } = require('ramda');
const compose = require('ramda/src/compose');

const secondsInMinute = 60 * 60;

/** @: secondsToHours :: number -> number */
const secondsToHours = compose(
  Math.floor,
  converge(divide, [Number, always(secondsInMinute)]),
);

module.exports = secondsToHours;
