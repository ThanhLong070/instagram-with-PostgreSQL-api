// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');
const { Op } = require('sequelize');

/**
 * Get info current user
 * @param {object} params Params request
 * @returns {object} Current user
 */
exports.getProfile = async (user) => {
  const profile = await this.getUser({ id: user.id });
  if (!profile) throw createError.NotFound('No profile found');
  return { id: profile.id, email: profile.email };
};

/**
 * Check email is registered
 * @param {string} email Email request
 * @returns {void} This method returns no data.
 */
exports.checkEmail = async (email) => {
  const existEmail = await this.getUser({ email });

  if (existEmail) {
    throw createError.Conflict(`This email is ready been registered`);
  }
};

/**
 * Check exist Account
 * @param {string} email
 * @param {string} userId
 * @returns {object} User data
 */
exports.checkExistAccount = async (email, userId) => {
  const user = await this.getUser({ [Op.or]: [{ email }, { id: userId }] });

  if (!user) {
    throw createError.NotFound(`This account doesn't exist.`);
  }

  return user;
};

/**
 * get User info
 * @param {object} obj queries data
 * @returns {object} User data
 */
exports.getUser = async (obj) => {
  return User.findOne({ where: obj });
};
