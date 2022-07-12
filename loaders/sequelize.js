// @ts-nocheck
const sequelize = require('../configs/database');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Report = require('../models/Report');
const Photo = require('../models/Photo');
const Follower = require('../models/Follower');
const Logger = require('./logger');

module.exports = async () => {
  User.hasMany(Post, { foreignKey: { allowNull: false } });
  Post.belongsTo(User);

  User.hasMany(Comment, { foreignKey: { allowNull: false } });
  Comment.belongsTo(User);

  User.hasMany(Like, { foreignKey: { allowNull: false } });
  Like.belongsTo(User);

  Comment.hasMany(Report, { foreignKey: { allowNull: false } });
  Report.belongsTo(Comment);

  Post.hasMany(Photo, { foreignKey: { allowNull: false } });
  Photo.belongsTo(Post);

  Photo.belongsToMany(User, { through: 'tagPhotos' });
  User.belongsToMany(Photo, { through: 'tagPhotos' });

  Report.belongsToMany(User, { through: 'userReport' });
  User.belongsToMany(Report, { through: 'userReport' });

  User.hasMany(Follower, { foreignKey: { allowNull: false } });
  Follower.belongsTo(User);

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
