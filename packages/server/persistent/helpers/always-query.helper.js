const { compose, always } = require('ramda');
const constructQuery = require('./construct-query.helper');

/** @: alwQ :: driver -> query table */
const alwQ = (knex) => compose(always, constructQuery(knex));

module.exports = alwQ;
