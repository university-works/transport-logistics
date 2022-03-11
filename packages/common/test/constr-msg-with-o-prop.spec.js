const assert = require('assert').strict;

const constructMessageWithObjectProperty = require('../src/constr-msg-with-o-prop');

describe('construct message with object property fn to construct message based on object property', () => {
  const message = 'passed value in null or undefined';

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
    it('should return eitherConstant message because of nullable value type', (done) => {
      const onFail =
        'undefined does not have a method named "concat" or "fantasy-land/concat"';

      Promise.resolve()
        .then(() =>
          constructMessageWithObjectProperty(object.notProp, message)(object),
        )
        .catch((err) => {
          assert.strictEqual(err.message, onFail);
          done();
        });
    });
  });
});
