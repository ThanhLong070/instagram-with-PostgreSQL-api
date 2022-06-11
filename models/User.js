const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../configs/database');

const { generateHash } = require('../utils/generate');

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      min: [4, 'Too short, min is 4 characters'],
      max: [32, 'Too long, max is 32 characters'],
      lowercase: true,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      min: [6, 'Password is too short, min is 6 characters'],
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: generateHash,
      beforeUpdate: generateHash,
    },
  }
);

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
