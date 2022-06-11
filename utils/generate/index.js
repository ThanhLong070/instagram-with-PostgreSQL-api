const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

module.exports = {
  generateHash: (account) => {
    if (account === null) {
      throw new Error('No found account');
    } else if (!account.changed('password')) return account.password;
    else {
      const salt = bcrypt.genSaltSync();
      account.password = bcrypt.hashSync(account.password, salt);
      return account.password;
    }
  },

  signToken: async (userId, time) => {
    return new Promise((resolve, reject) => {
      const payload = { _id: userId };

      const secret = process.env.SECRET_OR_KEY;
      const option = { expiresIn: time };

      JWT.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(`Bearer ${token}`);
      });
    });
  },

  makeRandomString: (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  makeRandomNumber: (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};
