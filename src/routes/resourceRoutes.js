'use strict';

//config for router
const express = require('express');
const resourceRouter = express.Router();
const bearerAuth = require("../middleware/bearer")
const { users, notes } = require('../models/index.js')
const HttpError = require("../error-handlers/http-error");
//pull in needed files
// pull in permissions MW
//pull in bearerAuth MW
//pull in acl
const acl = require('../middleware/acl.js');




const handleCreate = async (req, res, next) => {
    try {
        let { name, description } = req.body
        let record = await notes.create({ name, description, UserId:req.user.id })
        res.status(201).send(record)
    } catch (e) {
        return next(new HttpError("Something went wrong", 500))
    }
}


const handleGetAll = async (req, res, next) => {
    try {
        let username = req.user.username;
        let userid = req.user.id;
        let records = await notes.findAll({ where: {UserId: userid } })
        if (records.length === 0) {
            return next(new HttpError("No notes here", 404))
        }
        res.status(200).send(records)
    } catch (e) {
        return next(new HttpError("Something went wrong", 500))
    }
}

const handleGetOne = async (req, res, next) => {
    if (!req.params.id) {
        return next(new HttpError("Please specify which note you're trying to access", 400))
    }
    try {
        let id = req.params.id;
        let record = await notes.findOne({ where: { id } });
        res.status(200).send(record)
    } catch (e) {
        return next(new HttpError("Could not find that note", 404))
    }
}

const handleUpdateOne = async (req, res, next) => {
    if (!req.params.id) {
        return next(new HttpError("Please specify which note you're trying to access", 400))
    }
    try {
        let id = req.params.id;
        let obj = req.body
        let updated = await notes.update(obj, { where: { id } });
        res.status(202).send(updated);
    } catch (e) {
        return next(new HttpError("Could not find that note", 404))
    }
}

const handleDeleteOne = async (req, res, next) => {
    if (!req.params.id) {
        return next(new HttpError("Please specify which note you're trying to access", 400))
    }
    try {
        let id = req.params.id;
        let deleted = await notes.destroy({ where: { id } })
        res.status(202).send("note was deleted")
    } catch (e) {
        return next(new HttpError("Could not find that note", 404))
    }
}

resourceRouter.post('/notes', bearerAuth, acl('create'), handleCreate);
resourceRouter.get('/notes', bearerAuth, acl('read'), handleGetAll)
resourceRouter.get('/notes/:id', bearerAuth, acl('read'), handleGetOne)
resourceRouter.put('/notes/:id', bearerAuth, acl('update'), handleUpdateOne)
resourceRouter.delete('/notes/:id', bearerAuth, acl('delete'), handleDeleteOne)

module.exports = resourceRouter;