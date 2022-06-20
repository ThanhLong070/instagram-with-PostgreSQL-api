// @ts-nocheck
const Post = require('../models/Post');
const createError = require('http-errors');
const { createPostValidation } = require('../utils/validation/post');

/**
 * Post new post
 * @param {object} body Body request
 * @returns {object} Post data
 */
exports.createPost = async (body, user) => {
  const { error } = createPostValidation(body);
  if (error) throw createError(error.details[0].message);

  const post = await Post.create({ summary: body.summary, userId: user.id });

  return post;
};
