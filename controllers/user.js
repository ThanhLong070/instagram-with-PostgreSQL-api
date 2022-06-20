const userService = require('../services/user');

exports.getProfile = async (req, res) => {
  const { id, email } = req.user;

  const data = { id, email };

  return res.status(200).json({ success: true, data });
};
