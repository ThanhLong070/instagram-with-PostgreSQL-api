// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');
const {
  signupValidation,
  refreshTokenValidation,
  loginValidation,
  logoutValidation,
} = require('../utils/validation/auth');
const { signToken } = require('../utils/generate');
const { checkRegistered, checkExistAccount } = require('./user');
const { verifyToken } = require('../utils/validation');
const client = require('../loaders/redis');
const variables = require('../constants/variables');
const response = require('../constants/response');

/**
 * Signup
 * @param {object} body Body request data
 * @returns {object} User data
 */
exports.signup = async (body) => {
  signupValidation(body);

  await checkRegistered(body.email, body.username);

  return User.create(body);
};

/**
 * Refresh token
 * @param {object} body Body request data
 * @returns {object} accessToken and refreshToken data
 */
exports.refreshToken = async (body) => {
  refreshTokenValidation(body);

  const { userId } = body;
  if (!userId) throw createError.BadRequest();

  const { _id } = await verifyToken(userId);

  const accessToken = await signToken(_id, process.env.EX_ACCESS_TOKEN);
  const refreshToken = await signToken(_id, process.env.EX_REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Login
 * @param {object} body Body request data
 * @returns {object} accessToken and refreshToken data
 */
exports.login = async (body) => {
  loginValidation(body);

  const { email, password } = body;

  const user = await checkExistAccount(email, null, null);

  const isValid = user.validPassword(password);
  if (!isValid) response.PASSWORD_INCORRECT();

  const accessToken = await signToken(user.id, process.env.EX_ACCESS_TOKEN);
  const refreshToken = await signToken(user.id, process.env.EX_REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
};

/**
 * Logout
 * @param {object} body Body request data
 * @returns {object} accessToken and refreshToken data
 */
exports.logout = async (body) => {
  logoutValidation(body);

  const { _id } = await verifyToken(body.userId);

  await client.del(_id);

  return `${variables.SUCCESSFUL_LOGOUT}`;
};
