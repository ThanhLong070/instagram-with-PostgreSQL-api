// @ts-nocheck
const { checkExistAccount } = require('../services/user');

exports.getProfileInfo = async (req, res) => {
  const { username } = req.query;
  const user = await checkExistAccount(null, null, username);

  const {
    dataValues: { password, ...dataValuesAbridged },
  } = user;

  return res.status(200).json({ success: true, data: dataValuesAbridged });
};
