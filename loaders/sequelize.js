// @ts-nocheck
const sequelize = require('../configs/database');
const Post = require('../models/Post');
const User = require('../models/User');
const Logger = require('./logger');

module.exports = async () => {
  User.hasMany(Post, {
    foreignKey: { allowNull: false },
  });
  Post.belongsTo(User);

  return (
    sequelize
      // .sync({ force: true })
      .sync()
      .then(async () => {
        Logger.success(`✌️ PostgresSql Connected`);
      })
      .catch((error) => {
        Logger.error(`PostgresSql Connection Error: ${error}`);
      })
  );
};
