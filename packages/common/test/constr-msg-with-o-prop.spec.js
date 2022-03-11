const assert = require('assert').strict;
const chainWithId = require('./utils/chain-with-id');
const wrapWithEither = require('./utils/wrap-with-either');

const constructMessageWithObjectProperty = require('../src/constr-msg-with-o-prop');

describe('construct message with object property fn to construct message based on object property', () => {
  const message = 'passed value in null or undefined';

  const eitherConstr = wrapWithEither(
    message,
    constructMessageWithObjectProperty,
  );

  const object = {
    field: 'from constructor test',
  };

  describe('success way from construct message with object property function with either right inside', () => {
    it('should return constructed message', () => {
      const char = 'char';
      const toCompare = `${object.field}-${char}`;

      assert.strictEqual(
        toCompare,
        constructMessageWithObjectProperty('field', `-${char}`)(object),
      );
    });
  });

  describe('failed way from construct function with either left inside', () => {
    const selectValueFromEither = chainWithId(eitherConstr);

    it('should return eitherConstant message because of nullable value type', () => {
      assert.strictEqual(message, selectValueFromEither(object.notProp).value);
    });
  });
});
