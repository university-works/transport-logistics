const { curry, prop, compose, reduce } = require('ramda');
const propAndKey = require('./prop-and-key.utils');

/** @: addHandlerToRoute :: router -> key -> acc, entry -> ap router with entry */
const addHandlerToRoute = curry(
  (router, key) =>
    (acc, [path, fn]) => (router[key](path, fn), acc),
);

/** @: init :: router -> key -> add handler to router */
const init = curry((router, key) => reduce(addHandlerToRoute(router, key), []));

/** @: adjustHashTable :: key -> prop value in entry */
const adjustHashTable = (key) => compose(prop('value'), propAndKey(key));

/** @: boundRouteAndHandler :: router -> key -> add key handler router */
const boundRouteAndHandler = curry((router, key) =>
  compose(init(router, key), adjustHashTable(key)),
);

module.exports = boundRouteAndHandler;
