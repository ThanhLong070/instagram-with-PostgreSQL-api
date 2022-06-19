const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },

  summary: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  likes: {
    type: Sequelize.INTEGER,
    default: 0,
  },

  comments: {
    type: Sequelize.INTEGER,
    default: 0,
  },
});

module.exports = Post;
