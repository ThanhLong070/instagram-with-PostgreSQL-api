const Joi = require('joi');

const signUpValidation = (data) => {
  const signInSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).max(32).required(),
    passwordConfirmation: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });

  return signInSchema.validate(data);
};

const signInValidation = (data) => {
  const signInSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('gmail.com$'))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).max(32).required(),
  });

  return signInSchema.validate(data);
};

module.exports = {
  signUpValidation,
  signInValidation,
};
