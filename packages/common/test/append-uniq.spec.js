const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const {
  either,
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const appendUnique = require('../src/append-unique');

describe('append-uniq different scalar and object value types', () => {
  const makeUniq = chainWithId(appendUnique);

  const onSuccess = (x) => x;
  const onFailEqual = (message) => (value) => assert.equal(value, message);

  describe('success way from append-uniq function with either right inside', () => {
    it('should return uniq value for validation errors in log', () => {
      const log = {};

      const validationNameErr = {
        message: {
          name: 'is not correct',
        },
        field: 'validation',
      };

      const validationNameLog = appendUnique(validationNameErr, log);
      const sameLog = appendUnique(validationNameErr, log);

      assert.notDeepEqual(validationNameErr, validationNameLog.errors);
      assert.notDeepEqual(validationNameErr, sameLog);
    });
  });

  describe('success way from append-uniq function with either right inside', () => {
    const eitherContractMessage =
      'TypeError: invalid type given to Either.either';

    it('should fail because of function contract of append-uniq fn', () => {
      const safe = toEitherSafe(either);
      const left = safe(onSuccess, onFailEqual, makeUniq);
      either(onSuccess, onFailEqual(eitherContractMessage), left);
    });
  });
});
