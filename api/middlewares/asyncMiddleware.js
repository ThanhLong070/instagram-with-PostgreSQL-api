/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
// @ts-ignore
module.exports = asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
