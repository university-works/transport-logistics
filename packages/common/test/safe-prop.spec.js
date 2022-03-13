const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');

const prop = require('../src/safe-prop-either');

describe('[prop element for object]', () => {
  describe('> success way from prop function with either right inside', () => {
    const selectValueFromEither = chainWithId(prop);

    it('should return prop value for object', () => {
      const object = { value: 'for prop fn' };
      const property = 'value';
      const toCompare = 'for prop fn';
      assert.strictEqual(toCompare, selectValueFromEither(property, object));
    });
  });

  describe('> failde way from prop function with maybe noting inside', () => {
    const message = 'field value should be not null';

    it('should return Either Left field value should be not null for in list', () => {
      const object = 'x';
      const property = '';
      assert.strictEqual(message, prop(property)(object).value);
    });

    it('should return Either Left field value should be not null for in list', () => {
      const object = '';
      const property = 'x';
      assert.strictEqual(message, prop(property)(object).value);
    });

    it('should return Either Left field value should be not null for in list', () => {
      const object = 'what to';
      const property = 'test else';
      assert.strictEqual(message, prop(property)(object).value);
    });

    it('should return Either Left field value should be not null for in list', () => {
      const object = ']';
      const property = '[';
      assert.strictEqual(message, prop(property)(object).value);
    });
  });

  describe('> failed way from prop function with either left inside', () => {
    it('should return eitherLast message because of nullable value type', () => {
      const message = `field value should be not null`; // eslint-disable-line
      assert.strictEqual(message, prop(null, null).value);
    });
  });
});
