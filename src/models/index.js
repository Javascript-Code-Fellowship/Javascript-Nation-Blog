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

const users = userModel(sequelize, DataTypes);
const notes = noteModel(sequelize, DataTypes);

users.hasMany(notes, {
    onDelete: "cascade"
});
notes.belongsTo(users);

module.exports = {
  db: sequelize,
  users: users,
  notes: notes
}