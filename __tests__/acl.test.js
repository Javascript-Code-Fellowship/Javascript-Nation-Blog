'use strict';

const middleware = require('../src/middleware/acl.js');
const { db, users } = require('../src/models/index.js');

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
});

describe('Access Control Middleware testing', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();


  it('fails action for a user with the incorrect access permissions', () => {
    req.user = {
      capabilities: 'None ;P',
    };

    return middleware(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith(Error('Invalid credentials'));
        expect(res.status).toHaveBeenCalledWith(401);
      });

  });

  it('logs in an admin user with the right credentials', () => {
    req.user = {
      capabilities: 'All of \'em',
    };

    return middleware(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });

  });


});
