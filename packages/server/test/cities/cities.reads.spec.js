'use strict';

const assert = require('assert').strict;
const request = require('supertest');

const { identity, endAs } = require('../utils');
const { HTTP_STATUS_CODES } = require('../consts');
const { city } = require('../fixtures');

const future = require('../../src/app');

describe('city reads test', () => {
  describe('flow with success behaviour', () => {
    describe('get cities', () => {
      it('should return status code as citys are defined', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get('/cities');

          assert.equal(response.status, HTTP_STATUS_CODES.OK);
        };
        future.fork(identity, onSuccess);
      });
    });

    describe('get cities by id', () => {
      it('should return status code as city has been found by its id', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get(`/cities/${city.created.id}`);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.name, city.updated.name);
          assert.equal(
            typeof response.body.last_login,
            city.updated.last_login,
          );
          assert.equal(
            typeof response.body.contact_id,
            city.updated.contact_id,
          );

          assert.equal(response.headers.connection, 'close');
          assert.equal(
            response.headers['content-type'],
            'application/json; charset=utf-8',
          );
          assert.equal(response.headers['x-powered-by'], 'Express');
        };

        future.fork(identity, onSuccess);
      });
    });
  });

  describe('flow with failed behaviour', () => {
    describe('get cities by id', () => {
      it('should return err message as such city not found', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get(
            `/cities/${city.updated.id + 1}`,
          );

          assert.equal(response.body.length, 0);
        };
        future.fork(identity, onSuccess);
      });
    });
  });
});
