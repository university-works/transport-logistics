const { strict: assert } = require('assert').strict;
const fs = require('fs');
const { sequence, traverse, map } = require('ramda');

const wrapInFuture = require('../../../utils/wrap-in-future');
const constructErrInst = require('../../../utils/construct-err-inst');

const {
  futurify,
  futurifyWithEither,
} = require('../../../../src/internal/natural-transformations/cast-scalar-to-type/to-future');

describe('[cast scalar to type to future one]', () => {
  const files = ['src/safe-parse.js', 'src/safe-nth.js'];
  const read = (fn) => (file) => fn(file, 'utf-8');

  describe('> futurify e.g readFile fs', () => {
    const readFile = futurify(fs.readFile);

    it('should return expected result with ramda sequence fn, read both files and return future of json of these files', (done) => {
      const futureOfList = sequence(wrapInFuture, map(read(readFile), files));

      const onFail = () => done();
      const onOk = (ok) => {
        assert.notEqual(constructErrInst('err occurred'), ok);
        done();
      };
      futureOfList.fork(onFail, onOk);
    });

    it('should return expected result with ramda sequence fn, read both files and return future of json of these files', (done) => {
      const futureList = traverse(wrapInFuture, read(readFile), files);

      const onFail = () => done();
      const onOk = (ok) => {
        assert.notEqual(constructErrInst('err occurred'), ok);
        done();
      };
      futureList.fork(onFail, onOk);
    });
  });

  describe('> futurifyWithEither e.g readFile fs', () => {
    const readFile = futurifyWithEither(fs.readFile);

    it('should make conversions between types: scalar to either with saving value inside container', (done) => {
      const futureOfList = sequence(wrapInFuture, map(read(readFile), files));

      const onFail = () => done();
      const onOk = (ok) => {
        ok.map((either) =>
          assert.notEqual(constructErrInst('err occurred'), either.value),
        );
        done();
      };
      futureOfList.fork(onFail, onOk);
    });
  });
});
