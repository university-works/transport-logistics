const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const constant = require('../src/constant');

describe('[constant fn to return passed value and any value types]', () => {
  const message = 'passed value in null or undefined';
  const eitherConstant = wrapWithEither(message, constant);

  describe('> success way from constant function with either right inside', () => {
    const selectValueFromEither = chainWithId(eitherConstant);

    it('should return constant means same value', () => {
      const integer = 9;
      assert.strictEqual(integer, selectValueFromEither(integer));
    });
  });

  describe('> failed way from constant function with either left inside', () => {
    it('should return eitherConstant message because of nullable value type', () => {
      assert.strictEqual(message, eitherConstant(null).value);
    });
  });
});
