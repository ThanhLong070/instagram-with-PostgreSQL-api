const Joi = require('joi');
const { validate } = require('./index');

module.exports.createPostValidation = (data) => {
  const createPostSchema = Joi.object({
    note: Joi.string().required(),
  });

  validate(createPostSchema, data);
};
