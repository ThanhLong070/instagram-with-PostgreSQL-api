const postService = require('../services/post');

exports.createPost = async (req, res) => {
  const { body, user } = req;
  const data = await postService.createPost(body, user);

  return res.status(200).json({ success: true, data });
};
