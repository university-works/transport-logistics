'use strict';

const assert = require('assert').strict;
const request = require('supertest');

const { identity, endAs } = require('../utils');
const { HTTP_STATUS_CODES } = require('../consts');
const { user } = require('../fixtures');

const future = require('../../src/app');

describe('user reads test', () => {
  describe('flow with success behaviour', () => {
    describe('get users', () => {
      it('should return status code as users are defined', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get('/users');

          assert.equal(response.status, HTTP_STATUS_CODES.OK);
        };
        future.fork(identity, onSuccess);
      });
    });

    describe('get users by id', () => {
      it('should return status code as user has been found by its id', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get(`/users/${user.created.id}`);

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
    describe('get users by id', () => {
      it('should return err message as such user not found', () => {
        const onSuccess = async (app) => {
          const response = await request(app).get(
            `/users/${user.updated.id + 1}`,
          );

          assert.equal(response.body.length, 0);
        };
        future.fork(identity, onSuccess);
      });
    });
  });
});
