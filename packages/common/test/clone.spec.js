const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const {
  either,
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const clone = require('../src/clone');

describe('[clone different scalar and object value types]', () => {
  const makeClone = chainWithId(clone);

  const onSuccess = (x) => x;
  const onFailEqual = (message) => (value) => assert.equal(value, message);

  describe('> success way from clone function with either right inside', () => {
    const onFailIncludes = (message) => (value) =>
      assert.equal(true, value.includes(message));

    const onFailNotDeepEqual = (type) => (value) =>
      assert.notDeepEqual(type, value);

    const assertSafe = toEitherSafe(assert.equal);

    const eitherNotReferenceEqual =
      'AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal';

    it('should return clonned value for array', () => {
      const array = [1, 2, 3];
      const left = assertSafe(makeClone(array), array);

      either(onSuccess, onFailNotDeepEqual(array), left);
      either(onSuccess, onFailIncludes(eitherNotReferenceEqual), left);
    });

    it('should return clonned value for object', () => {
      const object = { assert: 'clone' };
      const left = assertSafe(makeClone(object), object);

      either(onSuccess, onFailNotDeepEqual(object), left);
      either(onSuccess, onFailIncludes(eitherNotReferenceEqual), left);
    });
  });

  describe('> success way from clone function with either right inside', () => {
    const eitherContractMessage =
      'TypeError: invalid type given to Either.either';

    it('should fail because of function contract', () => {
      const safe = toEitherSafe(either);
      const left = safe(onSuccess, onFailEqual, makeClone);
      either(onSuccess, onFailEqual(eitherContractMessage), left);
    });
  });
});
