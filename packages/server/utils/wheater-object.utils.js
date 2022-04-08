const { compose, head, of } = require('ramda');
const mapOver = require('./map-over.utils');

/** @: wheaterObject :: view -> object -> map vector -> object */
const wheaterObject = (view) => compose(head, mapOver(view), of);

module.exports = wheaterObject;
