const Joi = require('joi');
const { validate } = require('./index');

/**
 * Signup validation
 * @param {object} data Signup validation data
 * @returns {void} This method returns no data.
 */
module.exports.signupValidation = (data) => {
  const signupSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    fullName: Joi.string().required(),
    username: Joi.string().lowercase().required(),
    password: Joi.string().min(6).max(32).required(),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });

  validate(signupSchema, data);
};

/**
 * Refresh token validation
 * @param {object} data Refresh token validation data
 * @returns {void} This method returns no data.
 */
module.exports.refreshTokenValidation = (data) => {
  const refreshTokenSchema = Joi.object({
    userId: Joi.string().required(),
  });

  validate(refreshTokenSchema, data);
};

/**
 * Login validation
 * @param {object} data Login validation data
 * @returns {void} This method returns no data.
 */
module.exports.loginValidation = (data) => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).max(32).required(),
  });

  validate(loginSchema, data);
};

/**
 * Logout validation
 * @param {object} data Logout validation data
 * @returns {void} This method returns no data.
 */
module.exports.logoutValidation = (data) => {
  const logoutSchema = Joi.object({
    userId: Joi.string().required(),
  });

  validate(logoutSchema, data);
};
