const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Report = sequelize.define('report', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Report;
