const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const trueByField = require('../src/true-by-field');

describe('[true by field fn passed property in object should not be falsy one]', () => {
  describe('> success way from true by field function with either right inside', () => {
    const message = 'passed value is null or undefined';

    const eitherTrueByField = wrapWithEither(message, trueByField);
    const selectValueFromEither = chainWithId(eitherTrueByField);

    const object = {
      property: 'boolean value wraps in either left',
    };

    it('should return either left because compared values returns false, and wrap in either left', () => {
      assert.strictEqual(
        message,
        selectValueFromEither(object.property, object).value,
      );
    });

    it('should return false for passed object', () => {
      const toCompare = true;
      assert.strictEqual(toCompare, trueByField('property', object));
    });

    it('should return true for passed object', () => {
      const toCompare = false;
      assert.strictEqual(
        toCompare,
        trueByField('property is false one', object),
      );
    });
  });

  describe('> failed way from true by field function with either left inside', () => {
    const safeTrueByField = toEitherSafe(trueByField);

    it('should return boolean value is false so wrap in left', () => {
      const value = false; // eslint-disable-line
      assert.strictEqual(value, safeTrueByField(null, null).value);
    });
  });
});
