const Joi = require('joi');
const { validate } = require('./index');

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
