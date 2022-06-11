// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');

/**
 * Get info current user
 * @param {object} params Params request
 * @returns {object} Current user
 */
exports.getProfile = async (params) => {
  const profile = await User.findOne({ where: { id: params.id } });

  if (!profile) throw createError.NotFound('No profile found');

  return profile;
};
