'use strict';

const assert = require('assert').strict;
const request = require('supertest');

const { identity } = require('../utils');
const { HTTP_STATUS_CODES } = require('../consts');
const { auth } = require('../fixtures');

const future = require('../../src/app');

describe('auth writes test', () => {
  describe('flow with success behaviour', () => {
    describe('post auth/register', () => {
      it('should return status code 200 ok wheather payload is passed', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/auth/register')
            .send(auth.register);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.accessToken, 'string');
          assert.equal(typeof response.body.refreshToken, 'string');
          assert.equal(typeof response.body.expiresIn, '24h');

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

    describe('post auth/login', () => {
      it('should return status code 200 ok wheather payload is passed', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/auth/login')
            .send(auth.login);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.accessToken, 'string');
          assert.equal(typeof response.body.refreshToken, 'string');
          assert.equal(typeof response.body.expiresIn, '24h');

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

    describe('post auth/logout', () => {
      it('should return status code 200 ok wheather payload is passed', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/auth/logout')
            .send(auth.logout);

          assert.equal(response.status, HTTP_STATUS_CODES.OK);

          assert.equal(typeof response.body.accessToken, 'string');
          assert.equal(typeof response.body.refreshToken, 'string');
          assert.equal(typeof response.body.expiresIn, '24h');

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
    describe('post auth/register', () => {
      it('should return err message as such user already registered', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/auth/register')
            .send(auth.register);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/auth/register');
          assert.equal(
            typeof response.body.err,
            `{"message":"EMAIL_ALREADY_TAKEN","property":"${auth.register.email}"}`,
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

    describe('post auth/register', () => {
      it('should return err message as such user already registered', () => {
        const onSuccess = async (app) => {
          const response = await request(app)
            .post('/auth/login')
            .send(auth.login);

          assert.equal(
            response.status,
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          );

          assert.equal(typeof response.body.path, '/auth/register');
          assert.equal(
            typeof response.body.err,
            `{"message":"EMAIL_ALREADY_TAKEN","property":"${auth.register.email}"}`,
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
});
