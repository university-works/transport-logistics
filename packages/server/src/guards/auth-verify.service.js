const { cast } = require('@fp/common');
const {
  compose,
  prop,
  set,
  lensProp,
  flip,
  curry,
  chain,
  identity,
} = require('ramda');
const { separateJwtToken } = require('../../utils/index');

const { toEitherSafe, either } = cast;

const token = require('../services/token.service');

/** @: authVerify :: req -> assoc user ctx */
const authVerify = (req) => {
  const getAuth = compose(prop('authorization'), prop('headers'));
  const payload = compose(chain(identity), separateJwtToken, getAuth);

  const params = { access: true };

  const flipVerify = flip(token.verify);
  const onVerify = compose(flipVerify(params), payload);

  const verify = toEitherSafe(onVerify);

  const left = (err) => {
    throw new Error(
      `Error occured while verifing access token: ${err.message}`,
    );
  };

  const right = curry((req, user) => set(lensProp('user'), user, req));

  return either(left, right(req), verify(req));
};

module.exports = authVerify;
