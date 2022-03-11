const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const {
  either,
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const avg = require('../src/avg');

describe('average value in list', () => {
  const average = chainWithId(avg);

  describe('success way from avg function with either right inside', () => {
    it('should return average value for integer values in list', () => {
      assert.equal(average([1, 2, 3]), 2);
    });

    it('should return average value for double values in list', () => {
      assert.equal(average([-0.12, 9.12, 5.1]), 4.7);
    });
  });

  describe('failed way from avg function with either left inside', () => {
    const onSuccess = (x) => x;
    const onFail = (message) => (value) => assert.equal(value, message);

    describe('handle either signature constract', () => {
      const eitherContractMessage =
        'TypeError: invalid type given to Either.either';

      it('should throw message with invalid either type passed to either fn', () => {
        const safe = toEitherSafe(either);
        const left = safe(onSuccess, onFail, average);
        either(onSuccess, onFail(eitherContractMessage), left);
      });
    });

    describe('handle not valid types', () => {
      const eitherFailMessage = 'value in list are not integer or float types';

      it('should not be able to handle string value types in list', () => {
        either(
          onSuccess,
          onFail(eitherFailMessage),
          average(['one', 'two', 'three']),
        );
      });

      it('should return Either Left with invalid type message', () => {
        either(onSuccess, onFail(eitherFailMessage), average([[], {}]));
      });
    });
  });
});
