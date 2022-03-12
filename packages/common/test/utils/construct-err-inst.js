const { construct } = require('ramda');

/** @: constructErrInst :: Message -> Error Message */
const constructErrInst = construct(Error);

module.exports = constructErrInst;
