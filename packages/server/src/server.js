'use strict';

const { cast, ap } = require('@fp/common');
const { compose, curry, always, map } = require('ramda');
const http = require('http');

const { toEither } = cast;
const { liftA2 } = ap;

const app = require('./app');
const { config } = require('../config/index');

const onFail = (err) => console.log({ err });

const onSuccess = (app) => {
  const eitherPort = compose(
    toEither('PORT can not be null or undefined'),
    config.get,
  );

  const listen = curry((port, server) => {
    const callback = always(`server is listening on port ${port}`);
    return server.listen(port, compose(console.log, callback));
  });

  const server = http.createServer(app);

  const eiPort = eitherPort('PORT');
  const eiWrap = (fn) => toEither(`failed to wrap ${fn.name} in either`, fn);

  const fnVector = [listen, server];
  const [, eiServer] = map(eiWrap)(fnVector);

  return liftA2(listen)(eiPort, eiServer);
};

app.fork(onFail, onSuccess);
