const { identity } = require('ramda');
const express = require('express');
const userView = require('./user.view');

const { universalRoute } = require('../../services/index');
const { userRepository } = require('../../repos/index');

const repository = userRepository.chain(identity);

const routes = universalRoute.router(repository);
const router = express.Router();

const key = 'user';

/**
 * @router.param('id', routes.param(userView, key));
 */

router
  .route('/')
  .get(...routes.read(userView, key))
  .post(...routes.create(userView));

router
  .route('/:id')
  .get(...routes.readOne(userView, key))
  .put(...routes.update(userView, key))
  .patch(...routes.update(userView, key))
  .delete(...routes.remove(userView, key));

module.exports = router;
