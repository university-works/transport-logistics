const { cast } = require('@fp/common');
const {
  always,
  curry,
  head,
  compose,
  prop,
  useWith,
  last,
  not,
  propSatisfies,
  map,
  both,
  length,
  either,
  equals,
  pick,
  concat,
} = require('ramda');
const { isEmpty, toBoolean } = require('../../utils/index');
const cacheRepo = require('./cache-repo.service');
const connector = require('../../persistent/connection');

const { toEither } = cast;

const {
  AUDIT_LOG_ACTION_RECORD: { AUDIT_LOG_ACTION, AUDIT_LOG_ENTITY },
} = require('../../consts/index');

const { wrapArgs, eitherFreeze } = require('../../utils/index');

/** @: baseRepository :: driver -> schema -> table -> table repository */
const baseRepository = curry((knex, schema, tableName) => {
  /** @: getInstance :: schema -> instance */
  const getInstance = (schemaName = schema) => {
    const key = `${schemaName}.${tableName}`;
    if (!cacheRepo.CACHE_MAP[key]) {
      cacheRepo.CACHE_MAP[key] = baseRepository(schemaName, tableName, knex);
    }
    return cacheRepo.CACHE_MAP[key];
  };

  /** @: knx -> -> driver */
  const knx = always(knex);

  /** @: getAll :: params -> vector records */
  const getAll = (
    { condition = {}, fields = ['*'], orderBy = [] } = {},
    trx = knex,
  ) =>
    trx(tableName)
      .withSchema(schema)
      .where(condition)
      .select(fields)
      .orderBy(orderBy);

  /** @: getAllPaginated :: params -> vector records */
  const getAllPaginated = (
    { condition = {}, skip = 0, limit = 25, fields = ['*'], orderBy = [] } = {},
    trx = knex,
  ) =>
    trx(tableName)
      .withSchema(schema)
      .limit(limit)
      .offset(skip)
      .where(condition)
      .select(fields)
      .orderBy(orderBy);

  /** @: getAllByIds :: params -> vector records */
  const getAllByIds = (
    { condition = {}, ids = [], fields = ['*'] } = {},
    trx = knex,
  ) =>
    trx(tableName)
      .withSchema(schema)
      .whereIn('id', ids)
      .andWhere(condition)
      .select(fields);

  /** @: count :: params -> integer */
  const count = async ({ condition = {} } = {}, trx = knex) => {
    const query = trx(tableName).withSchema(schema).count(`${tableName}.id`);

    const empty = compose(not, isEmpty);
    toEither('without where cause was used', empty(condition)).chain(
      always(query.where(condition)),
    );
    const toCount = compose(parseInt, prop('count'), last);
    return toCount(await query);
  };

  /** @: createOne :: params -> new entry */
  const createOne = async (
    { data, fields = '*', log = false } = {},
    trx = knex,
  ) => {
    const vector = await trx(tableName)
      .withSchema(schema)
      .insert(data, log ? '*' : fields);

    const created = head(vector);

    const toLog = ([id, action]) =>
      console.log({
        log: `new entry was created with id: ${id} and action: ${action}`,
      });

    const getIdAndItsLog = useWith(wrapArgs, [prop('id'), prop('create')]);
    const chainWith = compose(toLog, getIdAndItsLog);

    toEither('without logging', log).chain(
      always(chainWith(created, AUDIT_LOG_ACTION)),
    );
    return created;
  };

  /** @: getBy :: params -> record */
  const getBy = ({ condition, fields = ['*'] } = {}, trx = knex) =>
    trx(tableName).withSchema(schema).select(fields).where(condition).first();

  /** @: getById :: params -> record */
  const getById = ({ id, fields = ['*'] }, trx = knex) =>
    trx(tableName).withSchema(schema).select(fields).where({ id }).first();

  /** @: updateById :: params -> updated vector */
  const updateBy = async (
    { condition = {}, data, fields = '*', log } = {},
    trx = knex,
  ) => {
    const updateData = { ...data, updated_at: knex.fn.now() };

    const query = trx(tableName)
      .withSchema(schema)
      .update(updateData, log ? '*' : fields)
      .where(condition);

    const warn = propSatisfies((x) => x > 1, 'length');
    const toLog = () =>
      console.log('BaseRepo.updateBy is designed to update a single record');

    toEither(
      `managed to found base records: ${JSON.stringify(condition)}`,
      warn(query),
    ).chain(toLog);

    if (!query.length) {
      return query;
    }

    if (query.length > 1) {
      return query;
    }
    return head(query);
  };

  /** @: updateByIds :: params -> updated vector */
  const updateByIds = ({ ids = [], data, fields = [], log } = {}, trx) => {
    const mapOver = (id) =>
      updateBy({ condition: { id }, data, fields, log }, trx);

    const all = (prs) => Promise.all(prs);
    const update = compose(all, map(mapOver));
    return update(ids);
  };

  /** @: deleteBy :: params -> vector integers */
  const deleteBy = async ({ condition, log } = {}, trx = knex) => {
    const vector = await trx(tableName)
      .withSchema(schema)
      .where(condition)
      .delete();

    const logDefined = toBoolean(log);
    const lengthDefined = compose(toBoolean, length);

    const whetherLog = both(always(logDefined), always(lengthDefined(vector)));
    toEither('log deleted records', whetherLog()).chain(() => {});

    return vector;
  };

  /** @: deleteByIds :: params -> vector integers */
  const deleteByIds = async ({ ids = [], log }, trx = knex) => {
    const vector = await trx(tableName)
      .withSchema(schema)
      .whereIn('id', ids)
      .delete();

    const logDefined = toBoolean(log);
    const lengthDefined = compose(toBoolean, length);

    const whetherLog = both(always(logDefined), always(lengthDefined(vector)));
    toEither('log deleted records', whetherLog()).chain(() => {});

    return vector;
  };

  /** @: getFields :: obj -> fields -> picked obj fields */
  const getFields = curry((obj, fields) => {
    const wheater = either(equals(fields), equals(head(fields)));
    return wheater('*') ? obj : pick(fields, obj);
  });

  /** @: insertMany :: params -> vector of records */
  const insertMany = ({ data, fields = [] }, trx = knex) =>
    trx(tableName).withSchema(schema).insert(data, fields);

  /** @: getColumns :: params -> vector of fields */
  const getColumns = async ({ tableName }) => {
    const sql = `
      SELECT column_name AS column
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME='${tableName}'
    `;
    const table = await knex.raw(sql);
    return map(prop('column'))(table.rows);
  };

  /** @: getColumnsToSelect :: params -> vector of fields */
  const getColumnsToSelect = async (alias = tableName) => {
    const columns = await getColumns({ tableName });
    return map(concat(`${alias}.`))(columns);
  };

  /** @: logAction :: -> -> audit log obj */
  const logAction = always(AUDIT_LOG_ACTION);

  /** @: logEntity :: -> -> audit entity obj */
  const logEntity = always(AUDIT_LOG_ENTITY);

  /** @: getByIdQuery :: id -> driver -> entity */
  const getByIdQuery = curry((id, trx = knex) =>
    trx(tableName).withSchema(schema).where(`${tableName}.id`, id).first(),
  );

  /** @: streamAllData :: params -> stream */
  const streamAllData = (
    { options = {}, condition = {}, fields = ['*'] } = {},
    trx = knex,
  ) => {
    const query = trx(tableName).withSchema(schema).select(fields);
    return isEmpty(condition) ? query.stream(options) : query.where(condition);
  };

  const methods = {
    getInstance,
    knx,
    getAll,
    getAllPaginated,
    getAllByIds,
    createOne,
    count,
    getBy,
    getById,
    updateBy,
    updateByIds,
    deleteBy,
    deleteByIds,
    getFields,
    insertMany,
    getColumns,
    getColumnsToSelect,
    logAction,
    logEntity,
    getByIdQuery,
    streamAllData,
  };

  return eitherFreeze('methods can not be undefined')(methods);
});

const schema = 'public';

module.exports = baseRepository(connector, schema);
