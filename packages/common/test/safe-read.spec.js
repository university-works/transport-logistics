const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const { safeRead } = require('../src/safe-read');

describe('[read file with either]', () => {
  describe('> success way from read function with either right inside', () => {
    const selectValueFromEither = chainWithId(safeRead);

    it('should return read ok', () => {
      const path = 'test/safe-read.spec.js';
      const toCompare = typeof path;
      assert.strictEqual(toCompare, typeof selectValueFromEither(path));
    });
  });

  describe('> failde way from read function with either left inside', () => {
    it('should return Either Left EISDIR: illegal operation on a directory, read', () => {
      const message = 'EISDIR: illegal operation on a directory, read';
      const path = './';
      assert.strictEqual(message, safeRead(path).value.message);
    });

    it("should return Either Left ENOENT: no such file or directory, open 'what else to test'", () => {
      const message =
        "ENOENT: no such file or directory, open 'what else to test'";
      const path = 'what else to test';
      assert.strictEqual(message, safeRead(path).value.message);
    });

    it('should return Either Left The "path" argument must be of type string or an instance of Buffer or URL. Received undefined', () => {
      const message =
        'The "path" argument must be of type string or an instance of Buffer or URL. Received undefined';
      const path = undefined;
      assert.strictEqual(message, safeRead(path).value.message);
    });

    it("should return Either Left ENOENT: no such file or directory, open 'hello world from either inside read fn'", () => {
      const message =
        "ENOENT: no such file or directory, open 'hello world from either inside read fn'";
      const path = 'hello world from either inside read fn';
      assert.strictEqual(message, safeRead(path).value.message);
    });
  });

  describe('> failed way from read function with either left inside', () => {
    it('should return either read message because of nullable value type', () => {
      const message =
        'The "path" argument must be of type string or an instance of Buffer or URL. Received null';
      assert.strictEqual(message, safeRead(null).value.message);
    });
  });
});
