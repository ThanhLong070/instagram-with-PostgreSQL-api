const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Photo = sequelize.define('photo', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Photo;
