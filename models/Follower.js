const Sequelize = require('sequelize');

const sequelize = require('../configs/database');
const User = require('./User');

const Follower = sequelize.define('follower', {
  followerId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Follower;
