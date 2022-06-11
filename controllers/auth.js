const authService = require('../services/auth');

exports.signUp = async (req, res) => {
  const data = await authService.signUp(req.body);

  return res.status(200).json({ success: true, data });
};

exports.signIn = async (req, res) => {
  const data = await authService.signIn(req.body);

  return res.status(200).json({ success: true, data });
};
