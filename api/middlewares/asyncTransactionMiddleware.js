// @ts-nocheck
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
// @ts-ignore
const sequelize = require('../../configs/database');

module.exports.asyncTransaction = async function handle(req, res, next) {
  let fn = this.handle;
  const t = await sequelize.transaction();

  try {
    fn(req, res, next);
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
