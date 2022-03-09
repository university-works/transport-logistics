const { curry, pipe, prop, flip, concat } = require('ramda');

/** constructMessageWithObjectProperty :: Field -> Message -> Object -> Object[Field] Message */
const constructMessageWithObjectProperty = curry(
  (field, message) => pipe(prop(field), flip(concat)(message)), //eslint-disable-line
);

module.exports = constructMessageWithObjectProperty;
