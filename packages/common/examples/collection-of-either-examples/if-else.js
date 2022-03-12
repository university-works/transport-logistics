/**
 * @handle if else condition
 */

const { compose, chain, identity, concat, always } = require('ramda');
const {
  either,
  toEither,
} = require('../../src/internal/natural-transformations/cast-scalar-to-type/to-ramda-either');

const stringify = require('../../src/safe-stringify');

/** @: renderPage :: User -> Either Error Right User */
const renderPage = compose(concat('render page: '), chain(identity), stringify);

/** @: showLogin :: Message -> Message */
const showLogin = always('please, login');

/** @: wrapUserInEither :: Value -> Either Left Message Right Value */
const wrapUserInEither = toEither('user not logged in');

/** @: controlFlow :: Either -> ( -> Handler Either Left, -> Handler Either Right) */
const controlFlow = either(showLogin, renderPage);

/**
 * @usage
 */

const user = { username: '1n', age: 1 };

const current = wrapUserInEither(user);
const noUser = wrapUserInEither(null);

const openSiteWithUser = controlFlow(current);
const openSiteWithoutUser = controlFlow(noUser);

/**
 * @console.table({ openSiteWithUser, openSiteWithoutUser }); // eslint-disable-line
 */
