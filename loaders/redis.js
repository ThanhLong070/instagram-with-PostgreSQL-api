// @ts-nocheck
const redis = require('redis');
const variables = require('../constants/variables');
const { throwError } = require('../utils/errorHandle');

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) =>
  console.log(`${variables.REDIS_CLIENT_ERROR}`, err)
);

(async () => {
  try {
    await client.connect();
  } catch (error) {
    throwError(error.status, error.message);
  }
})();

module.exports = client;
