'use strict';

const { cast, ap } = require('@fp/common');
const { compose, curry, always, map, prop, call } = require('ramda');

const http = require('http');

const { toEither } = cast;
const { liftA2 } = ap;

const app = require('./app');

const { config } = require('../config/index');
const { wrapLogger } = require('../logger/index');

const onFail = compose(wrapLogger('warn'), prop('message'));

const onSuccess = (app) => {
  const eitherPort = compose(
    toEither('PORT can not be null or undefined'),
    config.get,
  );

  const listen = curry((port, server) => {
    const callback = always(`server is listening on port ${port}`);
    return server.listen(port, compose(wrapLogger('info'), callback));
  });

  const server = http.createServer(app);

  const eiPort = eitherPort('PORT');
  const eiWrap = (fn) => toEither(`failed to wrap ${fn.name} in either`, fn);

  const fnVector = [listen, server];
  const [, eiServer] = map(eiWrap)(fnVector);

  const resolveAmqp = './shared/amqp/index';
  const apAmqp = compose(call, require)(resolveAmqp);

  return liftA2(listen)(eiPort, eiServer);
};

app.fork(onFail, onSuccess);
