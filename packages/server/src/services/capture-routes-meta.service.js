const { identity, curry } = require('ramda');
const express = require('express');

const { gatherRouters } = require('../../utils/route/index');
const universalRoute = require('./construct-universal-route.service');

/** @: general :: base -> :id -> router ... key -> router */
const general = curry((base, id) =>
  curry((router, routes, view, key) => {
    router
      .route(base)
      .get(...routes.read(view, key))
      .post(...routes.create(view));

    router
      .route(id)
      .get(...routes.readOne(view, key))
      .put(...routes.update(view, key))
      .patch(...routes.update(view, key))
      .delete(...routes.remove(view, key));

    return router;
  }),
);

/** @: captureRoutesMeta :: view ... meta -> router */
const captureRoutesMeta = curry((view, repository, key, meta) => {
  const repo = repository.chain(identity);
  const routes = universalRoute.router(repo);
  const router = express.Router();
  const toGather = gatherRouters(router)(meta);
  const baseOne = general('/', '/:id');
  return baseOne(router, routes, view, key);
});

module.exports = captureRoutesMeta;
