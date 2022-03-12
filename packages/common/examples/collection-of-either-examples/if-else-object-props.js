/**
 * @handle if else conditions with either and maybe for object properties
 */

const { prop, compose, always, call, curry, map } = require('ramda');

const {
  either,
  toEither,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const {
  maybe,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-maybe');

/**
 * @example-a with either
 */

/** @: loadPrefs :: Preferences -> Preferences */
const loadPrefs = compose(call, always);

/** @: notPremium :: Value -> Value */
const notPremium = curry(always);

/**
 * @usage of example-a
 */

/** @: defaltPrefs :: constant */
const defaltPrefs = ['franch', 'german'];

const wrapUserInEither = toEither('user does not have premium');
const controlFlow = either(notPremium(defaltPrefs), loadPrefs);

const user = { premium: false, preferences: ['english', 'ukrainian'] };

const current = wrapUserInEither(user).map(prop('preferences'));
const noUser = wrapUserInEither(null);

const getPrefWithUser = controlFlow(current);
const getPrefWithoutUser = controlFlow(noUser);

/**
 * @console.table({ getPrefWithUser, getPrefWithoutUser }); // eslint-disable-line
 */

/**
 * @example-b with either
 */

/** @: getPrefs :: User -> Either Error User */
const getPrefs = compose(
  map(prop('preferences')),
  toEither('user does not have premium'),
);

/** @: ei :: Either Handler Left, Right */
const ei = either(notPremium, loadPrefs);

/**
 * @usage of example-b
 */

const exists = getPrefs(user);
const notExists = getPrefs(null);

/**
 * @console.table({ user: ei(exists), noUser: ei(notExists) }); // eslint-disable-line
 */

/**
 * @example-c with maybe
 */

/** @: prefMaybe :: User -> Maybe Nothing Just User Prefs */
const prefMaybe = compose(map(prop('preferences')), maybe);

/**
 * @usage of example-c
 */

const maybeUser = prefMaybe(user).getOrElse(defaltPrefs);
const nothingUser = prefMaybe(null).getOrElse(defaltPrefs);

/**
 * @console.table({ maybeUser, nothingUser }); // eslint-disable-line
 */
