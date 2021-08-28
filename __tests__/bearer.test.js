'use strict';

require('dotenv').config();
const middleware = require('../src/middleware/bearer.js');
const { db, users } = require('../src/models/index.js');
const HttpError = require('../src/error-handlers/http-error.js')
const jwt = require('jsonwebtoken');

let testUsers = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

beforeAll(async (done) => {
  await db.sync();
  await users.create(testUsers.admin);
  done();
});

afterAll(async (done) => {
  await db.drop();
  done();
})

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }

  const next = jest.fn();
  
  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      let error = new HttpError("Invalid credentials", 401);

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith(error);
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET || 'secretstring');

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});
