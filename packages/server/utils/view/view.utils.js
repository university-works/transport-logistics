const { pick, converge, identity } = require('ramda');
const columns = require('./columns.utils');

/** @: view :: exclude -> entity -> entity without excluded */
const view = (...fields) => converge(pick, [columns(fields), identity]);

module.exports = view;
