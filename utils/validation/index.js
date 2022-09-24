// @ts-nocheck
const JWT = require('jsonwebtoken');
const response = require('../../constants/response');
const client = require('../../loaders/redis');

/**
 * Validate data
 * @param {object} schema Schema data
 * @param {object} data Validate data
 * @returns {void} This method returns no data.
 */
module.exports.validate = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) response.VALIDATE_DATA(error.details[0].message);
};

/**
 * Verify token
 * @param {string} token
 * @returns {Promise<void>} This method returns no data.
 */
module.exports.verifyToken = async (userId) => {
  const token = await client.get(userId);

  if (!token) response.UNAUTHORIZED();

  return new Promise((resolve, reject) => {
    JWT.verify(token, process.env.SECRET_OR_KEY, async (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
};
