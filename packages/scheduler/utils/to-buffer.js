const { compose, chain } = require('ramda');
const { fns } = require('@fp/common');

const { safeStringify } = fns;

const toBuffer = compose(chain(Buffer.from), safeStringify);

module.exports = toBuffer;
