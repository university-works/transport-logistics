const { prop, compose, chain } = require('ramda');
const fs = require('fs');

const {
  toEitherSafe,
} = require('./internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const toEncoding = require('./to-encoding');

/** @: readSafe :: fs -> Either Left Right fs[prop] */
const readSafe = compose(toEitherSafe, prop('readFileSync'));

/** @: read:: File -> Either Left Right fs[prop] File  */
const read = readSafe(fs);

/** @: getEncoding :: Encoding -> Buffer -> Either Data Type Based On Encoding */
const getEncoding = compose(toEitherSafe, toEncoding);

/** @: readEither :: File -> Either Left Right File Content */
const readEither = compose(chain(getEncoding('utf-8')), read);

module.exports = { safeRead: readEither };
