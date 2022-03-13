const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const headEqualsGreatest = require('../src/head-equals-greatest');

describe('[head in list should be greatest value]', () => {
  describe('> success way from head equals greatest function with either right inside', () => {
    const message = 'passed value is null or undefined';

    const eitherHead = wrapWithEither(message, headEqualsGreatest);
    const selectValueFromEither = chainWithId(eitherHead);

    const list = [1, 2, 3];

    it('should return either left because compared values returns false, and wrap in either left', () => {
      assert.strictEqual(message, selectValueFromEither(list).value);
    });

    it('should return false for passed range of numbers', () => {
      const toCompare = false;
      assert.strictEqual(toCompare, headEqualsGreatest(list));
    });

    it('should return true for passed range of numbers', () => {
      const headList = [3, 2, 1];
      const toCompare = true;
      assert.strictEqual(toCompare, headEqualsGreatest(headList));
    });
  });

  describe('> failed way from head first is greatest one function with either left inside', () => {
    const safeHead = toEitherSafe(headEqualsGreatest);

    it('should return boolean value is false so wrap in left', () => {
      const message = `Cannot read property '0' of null`; // eslint-disable-line
      assert.strictEqual(message, safeHead(null).value.message);
    });
  });
});
