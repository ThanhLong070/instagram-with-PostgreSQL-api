// @ts-nocheck
const { minIoUpload } = require('../services/minIo');
const postService = require('../services/post');
const {
  createPostValidation,
  updatePostValidation,
} = require('../utils/validation/post');

exports.createPost = async (req, res) => {
  const { body, user, files } = req;

  createPostValidation(body);

  if (!files) throw createError.NotFound(`File upload doesn't exist.`);
  const fileUpload = files.image;

  const data = await postService.createPost(body, user, files);

  // TODO: upload to MinIO
  const photo = await minIoUpload(user, data.id, fileUpload);

  return res.json({ success: true, data: { ...data, photo } });
};

exports.getPosts = async (req, res) => {
  const { query, user } = req;

  let whereStatement = {
    userId: query.userId ? query.userId : user.id,
  };
  if (query.postId) whereStatement.id = query.postId;

  const data = await postService.getPosts(whereStatement);

  return res.json({ success: true, data });
};

exports.patchPostById = async (req, res) => {
  const { body, params, user } = req;

  updatePostValidation(body);

  await postService.checkExistPost(params.postId, user.id);

  const data = await postService.updatePost(body, params.postId);

  return res.json({ success: true, data });
};

exports.deletePostById = async (req, res) => {
  const { params, user } = req;

  await postService.checkExistPost(params.postId, user.id);

  const data = await postService.deletePost(params.postId);

  return res.json({ success: true, data });
};
