// @ts-nocheck
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `./env/${process.env.NODE_ENV}.env`),
});

const express = require('express');
const helmet = require('helmet');

const Logger = require('./loaders/logger');

async function startServer() {
  const app = express();
  app.use(helmet());

  await require('./loaders')(app);

  const port = process.env.PORT || 5000;

  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.success(`
      ################################################
            🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
