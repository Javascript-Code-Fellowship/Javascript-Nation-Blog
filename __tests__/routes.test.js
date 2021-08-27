'use strict';

require('dotenv').config();
const supertest = require('supertest');
const { app } = require('../src/server.js');
const { db, users, notes } = require('../src/models/index');
const { expect } = require('@jest/globals');


const mockRequest = supertest(app);


beforeAll(async () => {
    await db.sync();

})

afterAll(async () => {
    await db.drop();
})

describe('AUTH ROUTES', () => {

    it('should respond to a POST at /signup with a 201 and object when provided with a username and password', async () => {
        const request = await mockRequest.post('/signup').send({ username: "tester", password: "test" });
        expect(request.status).toBe(201);
        expect(typeof request.body).toBe('object')
    })

    xit('should respond to a POST at /signup with a 406 if no username and password are provided', async () => {
        const request = await mockRequest.post('/signup').send({ username: "", password: "" })
        expect(request.status).toBe(406)
    })

    xit('should respond to a POST at /signup with a 409 if user already exists', async () => {
        const request = await mockRequest.post('/signup').send({ username: "tester", password: "test" });
        expect(request.status).toBe(409)
    })

    it('should respond to a POST at /signin with a status of 202 and a token on the user', async () => {
        const request = await mockRequest.post('/signin').auth('tester', 'test')
        const token = request.body.token;
        expect(request.status).toBe(202);
        expect(token).toBeDefined();
    })


})

xdescribe('RESOURCES ROUTES', () => {

    it('should respond to a POST at /notes with 201 and an object, if the user is logged in', () => {

    })
})