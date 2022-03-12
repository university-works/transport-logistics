const assert = require('assert').strict;

const parse = require('../src/safe-parse');

describe('[parse input value type]', () => {
  describe('> success way from parse function with either right inside', () => {
    it('should return parsed value for input value type', () => {
      const json = '[1, 2, 3]';
      const toCompare = [1, 2, 3];
      assert.notStrictEqual(toCompare, parse(json).value);
    });
  });

  describe('> failde way from parse function with maybe noting inside', () => {
    it('should return Unexpected token . in JSON at position 1 for in list', () => {
      const json = '[.]';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token . in JSON at position 1)';
      assert.strictEqual(toCompare, parse(json).toString());
    });

    it('should return Unexpected token > in JSON at position 0 for in list', () => {
      const json = '>>>{{{{{';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token > in JSON at position 0)';
      assert.strictEqual(toCompare, parse(json).toString());
    });

    it('should return Unexpected token ; in JSON at position 0 for in list', () => {
      const json = ';';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token ; in JSON at position 0)';
      assert.strictEqual(toCompare, parse(json).toString());
    });

    it('should return Unexpected token p in JSON at position 0 for in list', () => {
      const json = 'parse.json.js';
      const toCompare =
        'Either.Left(SyntaxError: Unexpected token p in JSON at position 0)';
      assert.strictEqual(toCompare, parse(json).toString());
    });
  });

  describe('> failed way from parse function with either left inside', () => {
    it('should return eitherParse message because of nullable value type', () => {
      const value = null;
      assert.strictEqual(value, parse(null).value);
    });
  });
});
