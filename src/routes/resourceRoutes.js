'use strict';

//config for router
const express = require('express');
const resourceRouter = express.Router();
const bearerAuth = require("../middleware/bearer")
const { notes } = require('../models/index.js')
//pull in needed files
// pull in permissions MW
//pull in bearerAuth MW




const handleCreate = async (req, res) => {
    try {
        let record = await notes.create(req.body)
        res.status(201).send(record)
    } catch (e) {
        throw new Error('eror messege')
        //status code of 500 with generic error messege
    }
}


const handleGetAll = async (req, res) => {
    try {
        let records = await notes.findAll({})
        res.status(200).send(records)
    } catch (e) {
        //generic server error
        //statud code of 404 if no content
        throw new Error(e)
    }
}

const handleGetOne = async (req, res) => {
    try {
        let id = req.params.id;
        let record = await notes.findOne({ where: { id } });
        res.status(200).send(record)
    } catch (e) {
        throw new Error('error messege')
        //status code of 404 if no content exists
        //status of 400 if no id
    }
}

const handleUpdateOne = async (req, res) => {
    try {
        let id = req.params.id;
        let updated = await notes.update({ where: { id } });
        res.status(202).send(updated);
    } catch (e) {
        throw new Error('error messege')
        //status of 404 if no content
        //status of 400 if no id
    }
}

const handleDeleteOne = async (req, res) => {
    try {
        let id = req.params.id;
        let deleted = await notes.destroy({ where: { id } })
        res.status(202).send(deleted)
    } catch (e) {
        throw new Error('error messege', e)
        // status of 404 if no content
        //status of 400 if no id
    }
}

resourceRouter.post('/notes', bearerAuth, handleCreate);
resourceRouter.get('/notes', bearerAuth, handleGetAll)
resourceRouter.get('/notes/:id', bearerAuth, handleGetOne)
resourceRouter.put('/notes/:id', bearerAuth, handleUpdateOne)
resourceRouter.delete('/notes/:id', bearerAuth, handleDeleteOne)

module.exports = resourceRouter;