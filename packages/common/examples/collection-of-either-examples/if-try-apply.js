/**
 * @handle try catch inside if
 */

const { prop, compose, curry, chain, lensProp, set, always } = require('ramda');
const fs = require('fs');

const {
  either,
  toEither,
  toEitherSafe,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const toEncoding = require('../../src/to-encoding');

/** @: readSafe :: fs -> fs[readFileSync] */
const readSafe = compose(toEitherSafe, prop('readFileSync'));

/** @: safeProp :: Property -> Either Message Property Value */
const safeProp = curry(
  compose(toEither('previewPath should be not null'), prop),
);

/** @: safeRead :: Encoding -> Buffer -> Data Types Based On Encoding */
const safeRead = compose(toEitherSafe, toEncoding);

/** @: wrapExamples :: Field -> Either Error JSON */
const wrapExamples = compose(
  chain(safeRead('utf-8')),
  chain(readSafe(fs)),
  safeProp('previewPath'),
);

/** @: onPreviewOk :: Object -> Success -> Assoc */
const onPreviewOk = (object) => (ok) => {
  const lens = lensProp('preview');
  return set(lens, ok, object);
};

/**
 * @usage
 */

const example = {
  previewPath: 'examples/collection-of-either-examples/if-try-apply.js',
};

const flow = either(always(example), onPreviewOk(example));
const run = compose(flow, wrapExamples);

/**
 * @console.dir({ success: run(example), fail: run(null) }); // eslint-disable-line
 */
