const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Like = sequelize.define('like', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Like;
