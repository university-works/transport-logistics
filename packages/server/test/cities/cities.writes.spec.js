'use strict';

const assert = require('assert').strict;
const request = require('supertest');

const { identity, endAs } = require('../utils');
const { HTTP_STATUS_CODES } = require('../consts');
const { city } = require('../fixtures');

const future = require('../../src/app');

describe('city writes test', () => {
  describe('flow with success behaviour', () => {
    describe('post cities', () => {
      it('should return status code created city with success', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/cities')
            .send(city.created);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.name, city.created.name);
          assert.equal(
            typeof response.body.last_login,
            city.created.last_login,
          );
          assert.equal(
            typeof response.body.contact_id,
            city.created.contact_id,
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

    describe('put cities', () => {
      it('should return status code city updated with success', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .put(`/cities/${user.updated.id}`)
            .send(city.updated);

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
    describe('post cities', () => {
      it('should return err message as such city already created', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/cities')
            .send(city.created);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/cities');
          assert.equal(
            typeof response.body.err,
            `{"message":"EMAIL_ALREADY_TAKEN","property":"${city.created.email}"}`,
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

    describe('put cities', () => {
      it('should return err message as user not modified', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .put(`/cities/${city.updated.id}`)
            .send(city.updated);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/cities');
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
});
