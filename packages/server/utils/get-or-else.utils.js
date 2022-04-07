const { curry } = require('ramda');

/** @: getOrElse :: params -> functor -> functor functor params */
const getOrElse = curry((params, functor) => functor.getOrElse(params));

module.exports = getOrElse;
