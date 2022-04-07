const { curry } = require('ramda');

/** @: ap :: res -> status -> answer -> http request send status answer */
const ap = curry((res, status, answer) => res.status(status).send(answer));

module.exports = ap;
