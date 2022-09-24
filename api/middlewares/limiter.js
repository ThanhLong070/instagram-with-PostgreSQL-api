// @ts-nocheck
const variables = require('../../constants/variables');
const statusCode = require('../../constants/statusCode');

const client = require('../../loaders/redis');

module.exports = rateLimiter = () => {
  const secondsWindow = process.env.SECONDS_WINDOW;
  const allowedHits = process.env.ALLOWED_HITS;

  return async (req, res, next) => {
    const getIpUser =
      req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // console.log('getIpUser :>> ', getIpUser);

    const numRequest = await client.incr(getIpUser);
    let ttl;

    if (numRequest === 1) {
      await client.expire(getIpUser, secondsWindow);

      ttl = secondsWindow;
    } else ttl = await client.ttl(getIpUser);

    if (numRequest > allowedHits) {
      return res.status(statusCode.SERVICE_UNAVAILABLE).json({
        success: false,
        status: statusCode.SERVICE_UNAVAILABLE,
        message: `${variables.THE_SERVER_IS_BUSY}`,
        numRequest,
        ttl,
      });
    } else {
      next();
    }
  };
};
