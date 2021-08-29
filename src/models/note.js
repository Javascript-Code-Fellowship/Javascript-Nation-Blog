'user strict'

const noteModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Notes', {
    name: { type: DataTypes.STRING, required: true },
    description: { type: DataTypes.STRING, required: true }
    // createdby: {type: DataTypes.STRING, required: true}
  })

  return model;
}

module.exports = noteModel;