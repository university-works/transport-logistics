const { identity, curry } = require('ramda');
const { captureFieldToMap } = require('../../../utils/service/index');
const { userRepository } = require('../../repos/index');

const repository = userRepository.chain(identity);

const meta = {
  onCall: ['count', 'logAction'],
};

const tryPost = (body) => {
  console.log({ body });
  return body;
};

const tryUpdate = (id, body) => {
  console.log({ id, body });
  return { id, body };
};

const userService = (repository) => {
  const general = captureFieldToMap(repository)('onCall');

  const getByEmail = (email) => repository.getByEmail({ email });

  const setCurrentRefreshTokenAndGetUser = curry((id, refresh) =>
    repository.updateBy({
      condition: { id },
      data: { refresh_token: refresh },
    }),
  );

  const methods = {
    getByEmail,
    setCurrentRefreshTokenAndGetUser,
  };

  return { ...general(meta), ...methods, repository };
};

module.exports = userService(repository);
