const postService = require('../services/post');

exports.createPost = async (req, res) => {
  const data = await postService.createPost(req.body);

  return res.status(200).json({ success: true, data });
};
