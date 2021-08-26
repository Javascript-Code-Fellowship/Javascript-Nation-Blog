'use strict'

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user.js');
const noteModel = require('./note.js');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
  notes: noteModel(sequelize, DataTypes)
}