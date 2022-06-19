// @ts-nocheck
const Post = require('../models/Post');
const createError = require('http-errors');
const { createPostValidation } = require('../utils/validation/post');
const { checkExistAccount } = require('../services/user');

/**
 * Post new post
 * @param {object} body Body request
 * @returns {object} Post data
 */
exports.createPost = async ({ summary, userId }) => {
  const { error } = createPostValidation({ summary, userId });
  if (error) throw createError(error.details[0].message);

  await checkExistAccount(null, userId);

  const post = await Post.create({ summary, userId });

  return post;
};
