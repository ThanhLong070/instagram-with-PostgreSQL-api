const Joi = require('joi');
const { validate } = require('./index');

/**
 * Create post validation
 * @param {object} data Create post validation data
 * @returns {void} This method returns no data.
 */
module.exports.createPostValidation = (data) => {
  const createPostSchema = Joi.object({
    note: Joi.string().required(),
    photo: Joi.string().required(),
  });

  validate(createPostSchema, data);
};

/**
 * Update post validation
 * @param {object} data Update post validation data
 * @returns {void} This method returns no data.
 */
module.exports.updatePostValidation = (data) => {
  const updatePostSchema = Joi.object({
    note: Joi.string(),
    location: Joi.string(),
    isHideLikes: Joi.boolean(),
    isTurnOffCommenting: Joi.boolean(),
  });

  validate(updatePostSchema, data);
};
