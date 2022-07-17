// @ts-nocheck
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');
const Logger = require('./logger');

module.exports = async (app) => {
  await sequelizeLoader();
  Logger.success('✌️ DB loaded and connected!');

  await require('./redis');
  Logger.success('✌️ Redis loaded');

  await expressLoader(app);
  Logger.success('✌️ Express loaded');
};
