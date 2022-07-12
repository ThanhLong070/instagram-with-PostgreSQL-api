// @ts-nocheck
const User = require('../models/User');
const createError = require('http-errors');
const {
  signupValidation,
  loginValidation,
} = require('../utils/validation/auth');
const { signToken } = require('../utils/generate');
const { checkRegistered, checkExistAccount } = require('./user');

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

  const accessToken = await signToken(user.id, 3600);
  const refreshToken = await signToken(user.id, 7200);

  return { accessToken, refreshToken };
};
