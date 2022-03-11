const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const {
  either,
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const concatUniq = require('../src/concat-uniq');

describe('concat-uniq different scalar and object value types', () => {
  const makeUnique = chainWithId(concatUniq);

  const onSuccess = (x) => x;
  const onFailEqual = (message) => (value) => assert.equal(value, message);

  describe('success way from concat-uniq function with either right inside', () => {
    it('should return uniq value for numbers, not to add same value', () => {
      const set = [1, 2, 3];
      const toAppend = 1;
      assert.deepEqual(set, concatUniq(toAppend, set));
    });

    it('should return uniq value for numbers, to add new value', () => {
      const set = [1, 2, 3];
      const toAppend = -1;
      assert.deepEqual([...set, toAppend], concatUniq(toAppend, set));
    });
  });

  describe('success way from concat-uniq function with either right inside', () => {
    const eitherContractMessage =
      'TypeError: invalid type given to Either.either';

    it('should fail because of function contract of concat-uniq fn', () => {
      const safe = toEitherSafe(either);
      const left = safe(onSuccess, onFailEqual, makeUnique);
      either(onSuccess, onFailEqual(eitherContractMessage), left);
    });
  });
});
