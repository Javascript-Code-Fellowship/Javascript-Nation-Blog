'use strict';


const express = require('express');
const { users } = require('../models/index.js');
const authRouter = express.Router();
const HttpError = require("../error-handlers/http-error")
const basicAuth = require('../middleware/basic.js')



authRouter.post('/signup', async (req, res, next) => {
    console.log('here');
    try {
        console.log('here')
        let userRecord = await users.create(req.body)
        const user = {
            user: userRecord,
            token: userRecord.token
        }
        res.status(201).send(user)
    } catch (e) {
        if (e.message == "Validation error") {
            return next(new HttpError("Username in use", 409))
        }
        return next(new HttpError("You need both username and password to sign up", 406))
    }
})

authRouter.post('/signin', basicAuth, async (req, res, next) => {
    try {
        //MW verify that the user's password is the same as saved hash.
        //user is saved to the req object
        //took out basic auth middleware to test
        const user = {
            user: req.user,
            token: req.user.token
        }
        res.status(202).send(user)
    } catch (e) {
        return next(new HttpError("Something went wrong", 500))
    }
})



module.exports = authRouter;