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

  const { token } = body;
  if (!token) throw createError.BadRequest();

  const { _id } = await verifyToken(token);

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
  if (!isValid) throw createError.Unauthorized(`Password incorrect`);

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

  const { refreshToken } = body;

  const { _id } = await verifyToken(refreshToken);

  await client.del(_id);

  return 'Successful logout!';
};
