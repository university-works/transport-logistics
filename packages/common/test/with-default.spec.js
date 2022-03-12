const assert = require('assert').strict;

const {
  toEither,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const {
  toMaybe,
} = require('../src/internal/natural-transformations/cast-scalar-to-type/to-maybe');

const withDefault = require('../src/with-default');

describe('[witd default value type if algebraic type is left one]', () => {
  const stringEqualWithDefault = (onSuccess, onDefault) => (functor) =>
    assert.strictEqual(onSuccess, withDefault(functor, onDefault));

  const notEqualWithDefault = (onDefault) => (functor) =>
    assert.notEqual(onDefault, withDefault(functor, onDefault));

  describe('> success way from last function with container ok inside', () => {
    it('should return value inside either', () => {
      const onSuccess = 'either right';
      const onDefault = 'either left';
      const onEitherLeft = 'left side returned from either';
      const eitherRight = toEither(onEitherLeft, onSuccess);

      const apRightDefaults = stringEqualWithDefault(onSuccess, onDefault);
      const apLeftDefaults = notEqualWithDefault(onDefault);
      apRightDefaults(eitherRight);
      apLeftDefaults(eitherRight);
    });

    it('should return value inside maybe', () => {
      const onSuccess = 'maybe just';
      const onDefault = 'maybe nothing';
      const maybeJust = toMaybe(onSuccess);

      const apJustDefaults = stringEqualWithDefault(onSuccess, onDefault);
      const apNotingDefaults = notEqualWithDefault(onDefault);
      apJustDefaults(maybeJust);
      apNotingDefaults(maybeJust);
    });
  });

  describe('> failed way from last function with container fail inside', () => {
    it('should return default value because of either left returned', () => {
      const input = null;
      const onDefault = 'either left';
      const left = 'left side returned from either';
      const eitherRight = toEither(left, input);

      const apJustDefaults = stringEqualWithDefault(eitherRight, onDefault);
      apJustDefaults(eitherRight);
    });

    it('should return default value from with default fn because of maybe nothing is returned', () => {
      const input = null;
      const onDefault = 'maybe nothing';
      const maybeJust = toMaybe(input);
      const nothing = 'Maybe.Nothing()';

      assert.strictEqual(nothing, withDefault(maybeJust, onDefault).toString());
    });
  });
});
