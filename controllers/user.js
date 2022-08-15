// @ts-nocheck
const { checkExistAccount, uploadAvatar } = require('../services/user');

exports.getProfileInfo = async (req, res) => {
  const { username } = req.query;
  const user = await checkExistAccount(null, null, username);

  const {
    dataValues: { password, ...dataValuesAbridged },
  } = user;

  return res.status(200).json({ success: true, data: dataValuesAbridged });
};

exports.uploadAvatar = async (req, res) => {
  const { user, files } = req;

  console.log('files :>> ', files);

  const data = await uploadAvatar(user.id, files);

  return res.status(200).json({ success: true, data });
};
