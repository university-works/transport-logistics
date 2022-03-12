const { strict: assert } = require('assert').strict;
const { compose, split, join, curry } = require('ramda');

const iso = require('../../../src/internal/isomorphism/isomorphism-and-round-trip-data-transformations');

const chars = iso(split(' '), join(' '));

describe('[isomorphism and round trip data transformations]', () => {
  describe('> success way from iso conversions between string and list and round above', () => {
    const strictEqualIsoString = (message, conversion) =>
      assert.strictEqual(message, conversion);

    const strictEqualIsoList = (message, conversion) =>
      assert.deepStrictEqual(message, conversion);

    const to = compose(chars.from, chars.to);
    const from = compose(chars.to, chars.from);

    const message = 'should make conversions between types: string to array';

    it('should make conversions between types: string to array', () => {
      strictEqualIsoString(message, to(message));
    });

    it('should make conversions between types: array to string', () => {
      const fromString = split(' ');
      const convert = curry(compose(from, fromString));
      strictEqualIsoList(fromString(message), convert(message));
    });
  });
});
