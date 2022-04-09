const { call, lensProp, over, always } = require('ramda');
const { asyncWrap } = require('../../../utils/express/index');
const stateService = require('./state.service');

console.log({ stateService });

const stateCtrl = (service) => ({
  count: asyncWrap(async () =>
    over(lensProp('count'), always(await call(service.count)), {}),
  ),
  logAction: asyncWrap(async () => {
    return service.logAction();
  }),
  logEntity: asyncWrap(async () => {
    return service.logEntity();
  }),
});

// (async () => {
//   console.log({ count: await stateService.count() });
//   console.log({ count: await stateCtrl(stateService).count() });
// })();

module.exports = stateCtrl(stateService);
