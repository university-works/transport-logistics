const { compose, chain, identity } = require('ramda');
const baseRepository = require('../../services/construct-base-repository.service');

/** @: wrapBase :: either value -> value */
const wrapBase = compose(chain(identity), baseRepository);

module.exports = wrapBase;
