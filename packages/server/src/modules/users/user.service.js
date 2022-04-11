const { identity } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { userRepository } = require('../../repos/index');

const repository = userRepository.chain(identity);

const meta = {
  onCall: ['count', 'logAction'],
};

// const userService = captureFieldToMap(repository)('onCall');

//

const tryPost = (body) => {
  console.log({ body });
  return body;
};

const tryUpdate = (id, body) => {
  console.log({ id, body });
  return { id, body };
};

const general = captureFieldToMap(repository)('onCall');

module.exports = {
  tryPost,
  tryUpdate,
  ...general(meta),
};
