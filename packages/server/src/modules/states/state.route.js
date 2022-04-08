const { identity } = require('ramda');
const express = require('express');
const stateView = require('./state.view');

const { universalRoute } = require('../../services/index');
const { stateRepository } = require('../../repos/index');

const repository = stateRepository.chain(identity);

const routes = universalRoute.router(repository);
const router = express.Router();

const key = 'state';

router
  .route('/')
  .get(...routes.read(stateView, key))
  .post(...routes.create(stateView));

router
  .route('/:id')
  .get(...routes.readOne(stateView, key))
  .put(...routes.update(stateView, key))
  .patch(...routes.update(stateView, key))
  .delete(...routes.remove(stateView, key));

module.exports = router;
