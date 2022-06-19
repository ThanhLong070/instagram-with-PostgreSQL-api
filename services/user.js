// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');
const { Op } = require('sequelize');

/**
 * Get info current user
 * @param {object} params Params request
 * @returns {object} Current user
 */
exports.getProfile = async (params) => {
  const profile = await User.findOne({ where: { id: params.id } });

  if (!profile) throw createError.NotFound('No profile found');

  return { id: profile.id, email: profile.email };
};

exports.checkEmail = async (email) => {
  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) {
    throw createError.Conflict(`This email is ready been registered`);
  }
};

exports.checkExistAccount = async (email, userId) => {
  const user = await User.findOne({
    where: { [Op.or]: [{ email }, { id: userId }] },
  });

  if (!user) {
    throw createError.NotFound(`This account doesn't exist.`);
  }

  return user;
};
