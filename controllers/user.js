const userService = require('../services/user');

exports.getProfile = async (req, res) => {
  console.log('req.params :>> ', req.params);
  const data = await userService.getProfile(req.params);

  return res.status(200).json({ success: true, data });
};
