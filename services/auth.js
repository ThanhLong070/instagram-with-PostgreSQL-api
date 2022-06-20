// @ts-nocheck
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const createError = require('http-errors');
const {
  signUpValidation,
  signInValidation,
} = require('../utils/validation/auth');
const { signToken } = require('../utils/generate');
const { checkEmail, checkExistAccount } = require('../services/user');

/**
 * Sign up
 * @param {object} body Body request data
 * @returns {object} User data
 */
exports.signUp = async (body) => {
  const { error } = signUpValidation(body);
  if (error) throw createError(error.details[0].message);

  const { email, password } = body;

  await checkEmail(email);

  return User.create({ email, password });
};

/**
 * Sign in
 * @param {object} body Body request data
 * @returns {object} accessToken and refreshToken data
 */
exports.signIn = async (body) => {
  const { error } = signInValidation(body);
  if (error) throw createError(error.details[0].message);

  const { email, password } = body;

  const user = await checkExistAccount(email, null);

  const isValid = user.validPassword(password);
  if (!isValid) throw createError.Unauthorized(`Password incorrect`);

  const accessToken = await signToken(user.id, 3600);
  const refreshToken = await signToken(user.id, 7200);

  return { accessToken, refreshToken };
};
