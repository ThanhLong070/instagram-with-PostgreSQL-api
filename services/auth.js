// @ts-nocheck

const User = require('../models/User');
const createError = require('http-errors');
const { signUpValidation, signInValidation } = require('../utils/validation');
const { signToken } = require('../utils/generate');

exports.signUp = async (body) => {
  const { error } = signUpValidation(body);
  if (error) throw createError(error.details[0].message);

  const existingUser = await User.findOne({ where: { email: body.email } });

  if (existingUser) {
    throw createError.Conflict(`${body.email} is ready been registered`);
  }

  return User.create({ email, password });
};

exports.signIn = async (body) => {
  const { error } = signInValidation(body);
  if (error) throw createError(error.details[0].message);

  const { email, password } = body;

  const user = await User.findOne({ where: { email } });

  if (!user) throw createError.NotFound(`This account doesn't exist.`);

  const isValid = user.validPassword(password);
  if (!isValid) throw createError.Unauthorized(`Password incorrect`);

  const accessToken = await signToken(user.id, 3600);
  const refreshToken = await signToken(user.id, 7200);

  return { accessToken, refreshToken };
};
