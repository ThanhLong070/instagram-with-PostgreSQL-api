// @ts-nocheck
const postService = require('../services/post');
const {
  createPostValidation,
  updatePostValidation,
} = require('../utils/validation/post');

exports.createPost = async (req, res) => {
  const { body, user } = req;

  createPostValidation(body);

  const data = await postService.createPost(body, user);

  return res.status(200).json({ success: true, data });
};

exports.getPosts = async (req, res) => {
  const { query, user } = req;

  let whereStatement = {
    userId: query.userId ? query.userId : user.id,
  };
  if (query.postId) whereStatement.id = query.postId;

  const data = await postService.getPosts(whereStatement);

  return res.status(200).json({ success: true, data });
};

exports.patchPostById = async (req, res) => {
  const { body, params, user } = req;

  updatePostValidation(body);

  await postService.checkExistPost(params.postId, user.id);

  const data = await postService.updatePost(body, params.postId);

  return res.status(200).json({ success: true, data });
};

exports.deletePostById = async (req, res) => {
  const { params, user } = req;

  await postService.checkExistPost(params.postId, user.id);

  const data = await postService.deletePost(params.postId);

  return res.status(200).json({ success: true, data });
};
