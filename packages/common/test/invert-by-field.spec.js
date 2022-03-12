const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const invertByField = require('../src/invert-by-field');

describe('[complement to true by field fn passed property in object should not be falsy one]', () => {
  describe('> success way from complement to true by field function with either right inside', () => {
    const message = 'passed value is null or undefined';

    const eitherInvertByField = wrapWithEither(message, invertByField);
    const selectValueFromEither = chainWithId(eitherInvertByField);

    const object = {
      property: 'boolean value wraps in either left',
    };

    it('should return either left because compared values returns false, and wrap in either left', () => {
      const complement = true;
      assert.strictEqual(
        complement,
        selectValueFromEither(object.property, null),
      );
    });

    it('should return complement to false for passed object', () => {
      const toCompare = false;
      assert.strictEqual(toCompare, invertByField('property', object));
    });

    it('should return complement to true for passed object', () => {
      const toCompare = true;
      assert.strictEqual(
        toCompare,
        invertByField('property is false one', object),
      );
    });
  });

  describe('> failed way from complement to true by field function with either left inside', () => {
    const safeInvertByField = toEitherSafe(invertByField);

    it('should return boolean complement value is false so wrap in left', () => {
      const value = true; // eslint-disable-line
      assert.strictEqual(value, safeInvertByField(null, null).value);
    });
  });
});
