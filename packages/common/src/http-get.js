const { curry } = require('ramda');
const {
  futurify,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-future');

/** @: httpGet :: HttpClient -> Url -> Future Error HttpClient(Url)  */
const httpGet = curry((client, url) => futurify(client)(url));

module.exports = httpGet;
