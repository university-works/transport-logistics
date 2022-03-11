const { curry } = require('ramda');

const httpGet = require('./http-get');
const safeParse = require('./safe-parse');

const eitherToFuture = require('./internal/natural-transformations/convertation-between-algebraic-types/either-to-future');

/** @: getJson :: HttpClient -> Url -> Future Error JSON  */
const getJson = curry((client, url) =>
  httpGet(client)(url).map(safeParse).chain(eitherToFuture),
); // eslint-disable-line

module.exports = getJson;
