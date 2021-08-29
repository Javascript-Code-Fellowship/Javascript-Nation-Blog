'use strict';

const middleware = require('../src/middleware/basic.js');
const HttpError = require('../src/error-handlers/http-error.js')
const { db, users } = require('../src/models/index.js');

let testUsers = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

// // Pre-load our database with fake users
beforeAll(async (done) => {
  await db.sync();
  await users.create(testUsers.admin);
  done();
});
afterAll(async (done) => {
  await db.drop();
  done();
});

describe('Basic auth middleware testing', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      req.headers = {
        authorization: 'Basic YmFkX3Bhc3N3b3Jk',
      };

      let error = new HttpError("Invalid credentials", 401);

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith(error);
        });

    });

    it('logs in an admin user with the right credentials', () => {

      req.headers = {
        authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});
