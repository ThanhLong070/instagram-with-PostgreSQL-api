// @ts-nocheck
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`),
});

const express = require('express');
const helmet = require('helmet');

const Logger = require('./loaders/logger');
const variables = require('./constants');

async function startServer() {
  const app = express();
  app.use(helmet());

  await require('./loaders')(app);

  const port = process.env.PORT || 7000;

  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.success(`
      ################################################
            🛡️  ${variables.SERVER_LISTENING_ON_PORT}: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
