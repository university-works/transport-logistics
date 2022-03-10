const { curry, chain, compose } = require('ramda');

const {
  toEither,
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

/** @: nth :: N -> List -> List[N] */
const nth = curry((n, xs) => xs[n]);

/** @: split :: Symbol -> String -> List */
const split = curry((splitter, xs) => xs.split(splitter));

/** @: atob :: Encoding -> Ascii -> Binary */
const atob = curry((encoding, b64Encoded) =>
  Buffer.from(b64Encoded, encoding).toString(),
);

/** @: parse :: String -> JSON  */
const { parse } = JSON;

/** @: safeParse :: String -> Either Left Right JSON  */
const safeParse = toEitherSafe(parse);

/** @: base64ToJson :: Buffer -> JSON */
const base64ToJson = compose(safeParse, atob('base64'));

/** @: safeNth :: N -> List -> Either Message List[N] */
const safeNth = curry(
  compose(toEither('nth element is null or undefined'), nth),
);

/** @: separateJwtToken :: String -> Either Message List[N] */
const separateJwtToken = compose(safeNth(1), split('.'));

/** @: parseClaims :: Jwt -> Either Error JSON */
const parseClaims = compose(
  chain(base64ToJson),
  chain(separateJwtToken),
  toEither('value passed to parseClaims was nil'),
);

module.exports = parseClaims;
