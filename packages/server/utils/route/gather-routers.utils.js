const { curry, map, compose, converge, identity } = require('ramda');
const boundRouteAndHandler = require('./bound-route-and-handler.utils');

/** @: beforeAp :: router -> key -> bound router key */
const beforeAp = curry((router, key) => boundRouteAndHandler(router, key));

/** @: addRoutes :: router -> map beforeAp meta */
const addRoutes = (router) => compose(map(beforeAp(router)), Object.keys);

/** @: apMeta :: fns -> meta -> map fns meta */
const apMeta = (fns, meta) => fns.map((fn) => fn(meta));

/** @: gatherRouters :: router -> ap add over id */
const gatherRouters = (router) =>
  converge(apMeta, [addRoutes(router), identity]);

module.exports = gatherRouters;
