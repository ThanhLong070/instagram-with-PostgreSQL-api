const Joi = require('joi');

const createPostValidation = (data) => {
  const createPostSchema = Joi.object({
    summary: Joi.string().required(),
  });

  return createPostSchema.validate(data);
};

module.exports = {
  createPostValidation,
};
