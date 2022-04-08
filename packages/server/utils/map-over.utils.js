const { map } = require('ramda');

/** @: mapOver :: view -> map over view */
const mapOver = (view) => map(view);

module.exports = mapOver;
