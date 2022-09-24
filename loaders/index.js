// @ts-nocheck
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');
const Logger = require('./logger');
const variables = require('../constants/variables');

module.exports = async (app) => {
  await sequelizeLoader();
  Logger.success(`${variables.DB_LOADED}`);

  await require('./redis');
  Logger.success(`${variables.REDIS_LOADED}`);

  await expressLoader(app);
  Logger.success(`${variables.EXPRESS_LOADED}`);
};
