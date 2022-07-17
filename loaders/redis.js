// @ts-nocheck
const redis = require('redis');
const createError = require('http-errors');

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  try {
    await client.connect();
  } catch (error) {
    throw createError(error.message);
  }
})();

module.exports = client;
