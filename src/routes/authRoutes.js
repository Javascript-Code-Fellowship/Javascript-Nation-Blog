'use strict';


const express = require('express');
const { users } = require('../models/index.js');
const authRoute = express.Router();
// const basicAuth = require('middleware')


authRouter.post('/signup', async (req, res, next) => {
    try {
        let userRecord = await users.create(req.body)
        const user = {
            user: userRecord,
            token: userRecord.token
        }
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        //test errors, assign an if/else for the different errors or throw a generic error.
        next('eror')
        //status code of 409 if username already exists
        //status code of 406 if either username or password is not defined.
    }
})

authRouter.post('/signin', bsicAuth, async (req, res, next) => {
    try {
        //MW verify that the user's password is the same as saved hash.
        //user is saved to the req object
        const user = {
            user: req.user,
            token: req.user.token
        }
        res.status(202).send(user)
    } catch (e) {
        next('error')
        //status of 500 and generic error.  
    }
})



module.exports = authRoute;