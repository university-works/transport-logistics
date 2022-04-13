const { cast } = require('@fp/common');

const { adjustOnCreateError } = require('../../../utils/index');
const AUTH_USE_CASE_RECORD = require('../../../errors/domain-specific/auth.use-case');

const identity = require('../../modules/auth/auth.view');

const { either, toEither } = cast;

const { AUTH_USE_CASE } = AUTH_USE_CASE_RECORD;

/** @: jwtStrategy :: user -> validate */
const jwtStrategy = (user) => ({
  /** @: validate :: payload -> either left right */
  validate: (payload) => {
    const left = () => {
      throw new Error(
        adjustOnCreateError(AUTH_USE_CASE.INVALID_JWT_TOKEN, payload.email),
      );
    };
    return either(left, identity, toEither('user is not found by email', user));
  },
});

module.exports = jwtStrategy;
