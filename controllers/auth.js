const authService = require('../services/auth');

exports.signup = async (req, res) => {
  const data = await authService.signup(req.body);

  const {
    dataValues: { password, ...dataValuesAbridged },
  } = data;

  return res.status(200).json({ success: true, data: dataValuesAbridged });
};

exports.login = async (req, res) => {
  const data = await authService.login(req.body);

  return res.status(200).json({ success: true, data });
};

exports.logout = async (req, res) => {
  req.logout();

  return res.status(200).json({ success: true, data: 'Successful logout' });
};
