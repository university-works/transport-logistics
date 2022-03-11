const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const nth = require('../src/safe-nth');

describe('nth element in list', () => {
  describe('success way from last function with either right inside', () => {
    it('should return nth value for element in list', () => {
      const list = [1, 2, 3];
      const index = 1;
      const toCompare = 2;
      assert.strictEqual(toCompare, nth(index)(list).value);
    });
  });

  describe('failde way from nth function with maybe noting inside', () => {
    it('should return Noting {} for in list', () => {
      const list = [];
      const index = 11;
      const toCompare = 'Maybe.Nothing()';
      assert.strictEqual(toCompare, nth(index)(list).toString());
    });

    it('should return Noting {} for in list', () => {
      const list = [];
      const index = null;
      const toCompare = 'Maybe.Nothing()';
      assert.strictEqual(toCompare, nth(index)(list).toString());
    });

    it('should return Noting {} for in list', () => {
      const list = [];
      const index = 1;
      const toCompare = 'Maybe.Nothing()';
      assert.strictEqual(toCompare, nth(index)(list).toString());
    });

    it('should return Noting {} for in list', () => {
      const list = [];
      const index = [];
      const toCompare = 'Maybe.Nothing()';
      assert.strictEqual(toCompare, nth(index)(list).toString());
    });
  });

  describe('failed way from nth function with either left inside', () => {
    const safeNth = toEitherSafe(nth);

    it('should return eitherLast message because of nullable value type', () => {
      const message = `Cannot read property 'null' of null`; // eslint-disable-line
      const ap = toEitherSafe(safeNth(null).value);
      assert.strictEqual(message, ap(null).value.message);
    });
  });
});
