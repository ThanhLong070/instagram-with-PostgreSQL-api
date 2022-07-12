const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Comment;
