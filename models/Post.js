const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  note: {
    type: Sequelize.STRING,
    max: [2200, 'Too long, max is 2200 characters'],
    allowNull: false,
  },

  location: {
    type: Sequelize.STRING,
  },

  isHideLikes: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  isTurnOffCommenting: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Post;
