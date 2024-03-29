// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');
const { Op } = require('sequelize');
const { minIoUpload } = require('./minIo');
const response = require('../constants/response');

/**
 * Check account is registered
 * @param {string} email Email request
 * @param {string} username User name request
 * @returns {void} This method returns no data.
 */
exports.checkRegistered = async (email, username) => {
  const existEmail = await this.getUser({ email });
  const existusername = await this.getUser({ username });

  if (existEmail) {
    throw createError.Conflict(`This email is ready been registered`);
  }

  if (existusername) {
    throw createError.Conflict(`This username is ready been registered`);
  }
};

/**
 * Check exist Account
 * @param {string} email Email request
 * @param {string} userId User id request
 * @param {string} username User name request
 * @returns {object} User data
 */
exports.checkExistAccount = async (email, userId, username) => {
  const user = await this.getUser({
    [Op.or]: [{ email }, { id: userId }, { username }],
  });

  if (!user) response.NOT_EXISTS_USER();

  return user;
};

/**
 * Check exist Account
 * @param {string} email Email request
 * @param {string} userId User id request
 * @param {string} username User name request
 * @returns {object} User data
 */
exports.uploadAvatar = async (user, files) => {
  if (!files) throw createError.NotFound(`File upload doesn't exist.`);

  const fileUpload = files.image;
  if (fileUpload.length > 0) throw createError(`You can only choose one photo`);

  // TODO: upload to MinIO
  return minIoUpload(user, null, fileUpload);
};

/**
 * get User info
 * @param {object} obj queries data
 * @returns {object} User data
 */
exports.getUser = async (obj) => {
  return User.findOne({ where: obj });
};

/**
 * get list User data
 * @param {object} obj queries data
 * @returns {object} List User data
 */
exports.getUsers = async (obj) => {
  return User.findAll({ where: obj });
};
