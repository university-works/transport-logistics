const { head, lensProp, set, compose, prop } = require('ramda');
const { fns, cast } = require('@fp/common');

const { asyncWrap, id, apEither } = require('../../utils/express/index'); // eslint-disable-line
const { mapOver, wheaterObject } = require('../../utils/index');
const { authVerify } = require('../guards/index');

const { safeParse, safePropWithEither } = fns;
const { either } = cast;
const { left, right } = apEither;

/** @: universalRoute :: cache -> general route */
const universalRoute = (cache = {}) => ({
  /** @: route :: fn -> http request */
  route: (fn) => asyncWrap(async (req) => fn(req)),

  /** @: router :: repository -> http handlers */
  router: (repository) => ({
    /** @: param :: view -> instance -> http request */
    param: (view, instance) =>
      asyncWrap(async (req) => {
        const wheater = wheaterObject(view);
        const awaiter = await repository.getById({ id: id(req) });

        const toRun = set(lensProp(instance), wheater(awaiter));
        return compose(prop(instance), toRun)(cache);
      }),

    /** @: read :: view -> instance -> middlewares -> http request get */
    read: (view, instance, ...middlewares) => [
      ...middlewares,
      asyncWrap(async (req) => {
        const verify = await authVerify(req);

        const query = prop('query');
        const eiParse = compose(safeParse, prop('filter'));
        const onRead = compose(eiParse, query);

        if (req[instance]) {
          return view(req[instance]);
        }
        return either(
          left(view)(repository.getAll, {}),
          right(view)(repository.getAll, {}),
          onRead(req),
        );
      }),
    ],

    /** @: readOne :: view -> instance -> middlewares -> http request get */
    readOne: (view, instance, ...middlewares) => [
      ...middlewares,
      asyncWrap(async (req) => {
        const wheater = wheaterObject(view);
        const awaiter = await repository.getById({ id: id(req) });

        const toRun = set(lensProp(instance), wheater(awaiter));
        return compose(prop(instance), toRun)(cache);
      }),
    ],

    /** @: create :: view -> middlewares -> http request post */
    create: (view, ...middlewares) => [
      ...middlewares,
      asyncWrap(async (req) => {
        const { body } = req;
        const onCreate = left(view)(repository.createOne, { data: body });

        return either(onCreate, onCreate, safePropWithEither('body', req));
      }),
    ],

    /** @: update :: view -> instance -> middlewares -> http request put/patch */
    update: (view, instance, ...middlewares) => [
      ...middlewares,
      asyncWrap(async (req) => {
        const body = prop('body');
        const onUpdate = compose(head, mapOver(view));

        const awaiter = await repository.updateBy({
          condition: { id: id(req) },
          data: body(req),
        });
        return onUpdate(awaiter);
      }),
    ],

    /** @: remove :: view -> instance -> middlewares -> http request delete */
    remove: (view, instance, ...middlewares) => [
      ...middlewares,
      asyncWrap(async (req) => {
        const awaiter = await repository.deleteBy({
          condition: { id: id(req) },
        });
        const toMap = { id: id(req), affected: awaiter };
        return wheaterObject(view)(toMap);
      }),
    ],
  }),
});

module.exports = universalRoute({});
