const createError = require('http-errors');

module.exports.validate = (postSchema, data) => {
  const { error } = postSchema.validate(data);
  if (error) throw createError(error.details[0].message);
};
