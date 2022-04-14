'use strict';

const assert = require('assert').strict;
const request = require('supertest');

const { identity, endAs } = require('../utils');
const { HTTP_STATUS_CODES } = require('../consts');
const { user } = require('../fixtures');

const future = require('../../src/app');

describe('user writes test', () => {
  describe('flow with success behaviour', () => {
    describe('post users', () => {
      it('should return status code created user with success', () => {
        const onSuccess = async (app) => {
          const response = await request(app).post('/users').send(user.created);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.name, user.created.name);
          assert.equal(
            typeof response.body.last_login,
            user.created.last_login,
          );
          assert.equal(
            typeof response.body.contact_id,
            user.created.contact_id,
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

    describe('put users', () => {
      it('should return status code user updated with success', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .put(`/users/${user.updated.id}`)
            .send(user.updated);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.name, user.updated.name);
          assert.equal(
            typeof response.body.last_login,
            user.updated.last_login,
          );
          assert.equal(
            typeof response.body.contact_id,
            user.updated.contact_id,
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
    describe('post users', () => {
      it('should return err message as such user already created', () => {
        const onSuccess = async (app) => {
          const response = await request(app).post('/users').send(user.created);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/users');
          assert.equal(
            typeof response.body.err,
            `{"message":"EMAIL_ALREADY_TAKEN","property":"${user.created.email}"}`,
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

    describe('put users', () => {
      it('should return err message as user not modified', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .put(`/users/${user.updated.id}`)
            .send(user.updated);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/users');
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

  after(endAs);
});
