// @ts-nocheck
const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');
const Logger = require('./logger');
const variables = require('../constants/variables');
const sequelize = require('../configs/database');
const client = require('./redis');
const minIoLoader = require('./minIo');

module.exports = async (app) => {
  await sequelizeLoader();
  Logger.success(`${variables.DB_LOADED}`);

  await require('./redis');
  Logger.success(`${variables.REDIS_LOADED}`);

  await minIoLoader();
  Logger.success(`${variables.MIN_IO_LOADED}`);

  await expressLoader(app);
  Logger.success(`${variables.EXPRESS_LOADED}`);

  process.on('SIGINT', async () => {
    await sequelize
      .close()
      .then(() => console.log(`${variables.DB_DISCONNECTED}`));
    await client
      .quit()
      .then(() => console.log(`${variables.REDIS_DISCONNECTED}`));

    process.exit(0);
  });
};
