const util = require('util');
const { identity, path } = require('ramda');

const { eitherFreeze } = require('../../../../utils/index');
const { wrapLogger } = require('../../../../logger/index');

/** @: receiver :: inst -> fns */
const receiver = (base) => {
  /** @: consume :: channel -> handler */
  const consume = (channel) =>
    util.promisify((queue, fn, options, cb) =>
      channel.chain(identity).consume(
        queue,
        async (message, ...last) => {
          await fn({ data: { content: message.content.toString(), queue } });
          //
          // console.log({
          //   fn,
          //   message: message.content.toString(),
          //   // result: fn(message.content.toString()),
          // });

          wrapLogger('info', `received message: ${message.content.toString()}`);
          return cb(null, message);
        },
        options,
      ),
    );

  const methods = {
    consume: consume(base.chain(path(['pool', 'channel']))),
    ...base.chain(identity),
  };

  return eitherFreeze('methods for receiver can not be not provided')(methods);
};

module.exports = receiver;
