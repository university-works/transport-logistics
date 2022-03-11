const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const first = require('../src/first');

describe('first element in list', () => {
  describe('success way from fist function with either right inside', () => {
    const message = 'passed value in null or undefined';

    const eitherFirst = wrapWithEither(message, first);
    const selectValueFromEither = chainWithId(eitherFirst);

    it('should return first element in list', () => {
      const list = [1, 2, 3];
      const toCompare = 1;
      assert.strictEqual(toCompare, selectValueFromEither(list).value.value);
    });
  });

  describe('failed way from fist function with either left inside', () => {
    const safeFirst = toEitherSafe(first);

    it('should return eitherFirst message because of nullable value type', () => {
      const message = `Cannot read property '0' of null`; // eslint-disable-line
      assert.strictEqual(message, safeFirst(null).value.message);
    });
  });
});
