const assert = require('assert').strict;

const stringify = require('../src/safe-stringify');

describe('stringify input value type', () => {
  describe('success way from stringify function with either right inside', () => {
    it('should return stringify value for input value type', () => {
      const json = [1, 2, 3];
      const toCompare = '[1,2,3]';
      assert.strictEqual(toCompare, stringify(json).value);
    });
  });

  describe('failde way from parse function with maybe noting inside', () => {
    it('should return stringified value []', () => {
      const json = [];
      const toCompare = '[]';
      assert.strictEqual(toCompare, stringify(json).value);
    });

    it('should return stringified value {}', () => {
      const json = {};
      const toCompare = '{}';
      assert.strictEqual(toCompare, stringify(json).value);
    });

    it('should return stringified value null', () => {
      const json = null;
      const toCompare = null;
      assert.notStrictEqual(toCompare, stringify(json).value);
    });

    it('should return stringified value undefined', () => {
      const json = undefined;
      const toCompare = undefined;
      assert.strictEqual(toCompare, stringify(json).value);
    });
  });

  describe('failed way from parse function with either left inside', () => {
    it('should return eitherParse message because of nullable value type', () => {
      const value = null;
      assert.notStrictEqual(value, stringify(null).value);
    });
  });
});
