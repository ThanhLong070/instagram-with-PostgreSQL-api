// @ts-nocheck
const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const client = require('../../loaders/redis');

/**
 * Validate data
 * @param {object} schema Schema data
 * @param {object} data Validate data
 * @returns {void} This method returns no data.
 */
module.exports.validate = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) throw createError(error.details[0].message);
};

/**
 * Verify token
 * @param {string} token
 * @returns {Promise<void>} This method returns no data.
 */
module.exports.verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.SECRET_OR_KEY, async (err, payload) => {
      if (err) return reject(err);

      const reply = await client.get(payload._id);
      if (token === reply) return resolve(payload);
      return reject(createError.Unauthorized());
    });
  });
};
