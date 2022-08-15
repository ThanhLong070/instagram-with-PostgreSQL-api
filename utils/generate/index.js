// @ts-nocheck
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const client = require('../../loaders/redis');
const createError = require('http-errors');

module.exports = {
  generateHash: (account) => {
    if (account === null) {
      throw createError.NotFound(`No found account`);
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

      JWT.sign(payload, secret, option, async (err, token) => {
        if (err) reject(err);
        const reply = await client.get(userId);
        if (!reply && time === process.env.EX_REFRESH_TOKEN) {
          await client.setEx(userId, 24 * 60 * 60, token);
        }
        resolve(`Bearer ${reply ? reply : token}`);
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
