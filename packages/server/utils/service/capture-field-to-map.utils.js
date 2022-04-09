const { curry, compose, prop } = require('ramda');
const apRepoMethod = require('./ap-repo-method.utils');

/** @: captureFieldToMap :: instance -> field -> map over instance methods */
const captureFieldToMap = (repository) =>
  curry(compose(apRepoMethod(repository), prop));

module.exports = captureFieldToMap;
