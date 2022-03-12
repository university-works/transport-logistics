const { strict: assert } = require('assert').strict;
const { compose, add, curry } = require('ramda');

const {
  toEither,
  toEitherSafe,
} = require('../../../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

describe('[cast scalar to type to either one]', () => {
  describe('> toEitherSafe e.g parse', () => {
    const { parse } = JSON;
    const safeParse = toEitherSafe(parse);

    it('should return Unexpected token . in JSON at position 1 for in list', () => {
      const json = '[.]';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token . in JSON at position 1)';
      assert.strictEqual(toCompare, safeParse(json).toString());
    });

    it('should return Unexpected token > in JSON at position 0 for in list', () => {
      const json = '>>>{{{{{';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token > in JSON at position 0)';
      assert.strictEqual(toCompare, safeParse(json).toString());
    });
  });

  describe('> toEither consvert scalar type to either with ok and with fail message', () => {
    const onFail = 'passed value is null or undefined';
    const addWithEither = curry(compose(toEither(onFail), add));

    it('should make conversions between types: scalar to either with saving value inside container', () => {
      const acc = 1;
      const value = 2;
      const toCompare = acc + value;
      assert.strictEqual(toCompare, addWithEither(acc, value).value);
    });

    it('should make conversions between types: scalar to either with err message if it is', () => {
      const acc = undefined;
      const value = null;
      assert.strictEqual(onFail, addWithEither(acc, value).value);
    });
  });
});
