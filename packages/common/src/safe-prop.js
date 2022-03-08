const { Maybe } = require('ramda-fantasy');
const { compose, construct, curry, identity } = require('ramda');

const maybe = compose(construct(Maybe), identity);

const safeProp = curry((field, o) => maybe(o[field]));

module.exports = safeProp;
