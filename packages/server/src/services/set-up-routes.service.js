const { compose, reduce, curry } = require('ramda');

/** @: base :: router -> app, vector -> router user name fn */
const base =
  (router) =>
  (acc, [route, fn]) => (router.use(`/${route}`, fn), router);

/** @: setUpRoutes :: router -> hash router */
const setUpRoutes = curry((router) =>
  compose(reduce(base(router), {}), Object.entries),
);

module.exports = setUpRoutes;
