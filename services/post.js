// @ts-nocheck
const Post = require('../models/Post');
const variables = require('../constants/variables');
const response = require('../constants/response');

/**
 * Create new post
 * @param {object} body Body request
 * @param {object} user User login
 * @returns {object} Post data
 */
exports.createPost = async (body, user) => {
  return Post.create({ ...body, userId: user.id });
};

/**
 * get Post data
 * @param {object} obj queries data
 * @returns {object} Post data
 */
exports.getPost = async (obj) => {
  return Post.findOne({ where: obj });
};

/**
 * get list Post data
 * @param {object} obj queries data
 * @returns {object} List Post data
 */
exports.getPosts = async (obj) => {
  return Post.findAll({ where: obj });
};

/**
 * Update the post
 * @param {object} body Body data update
 * @param {string} postId Post id params
 * @returns {object} Post data
 */
exports.updatePost = async (body, postId) => {
  await Post.update(body, { where: { id: postId } });

  return this.getPost({ id: postId });
};

/**
 * Delete the post
 * @param {object} body Body data update
 * @param {string} postId Post id params
 * @returns {string} Successful delete post
 */
exports.deletePost = async (postId) => {
  await Post.destroy({ where: { id: postId } });

  return `${variables.SUCCESSFUL_DELETE_POST}`;
};

/**
 * Check the post is exist
 * @param {string} postId Post id params
 * @param {string} userId The current user id
 * @returns {void} This method returns no data.
 */
exports.checkExistPost = async (postId, userId) => {
  const existPost = await this.getPost({
    id: postId,
    userId,
  });

  if (!existPost) response.NOT_EXISTS_POST();
};
