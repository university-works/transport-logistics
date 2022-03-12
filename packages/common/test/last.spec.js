const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const {
  toEitherSafe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const last = require('../src/last');

describe('[last element in list]', () => {
  describe('> success way from last function with either right inside', () => {
    const message = 'passed value in null or undefined';

    const eitherLast = wrapWithEither(message, last);
    const selectValueFromEither = chainWithId(eitherLast);

    it('should return last element in list', () => {
      const list = [1, 2, 3];
      const toCompare = 3;
      assert.strictEqual(toCompare, selectValueFromEither(list).value);
    });

    it('should return Noting {} for in list', () => {
      const list = [];
      const toCompare = 'Maybe.Nothing()';
      assert.strictEqual(toCompare, selectValueFromEither(list).toString());
    });
  });

  describe('> failed way from last function with either left inside', () => {
    const safeLast = toEitherSafe(last);

    it('should return eitherLast message because of nullable value type', () => {
      const message = `Cannot read properties of null (reading 'fantasy-land/map')`; // eslint-disable-line
      assert.strictEqual(message, safeLast(null).value.message);
    });
  });
});
