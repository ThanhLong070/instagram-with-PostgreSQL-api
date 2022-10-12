// @ts-nocheck
const MinIo = require('minio');

const endPoint = process.env.ENDPOINT;
const port = process.env.PORT_MIN_IO;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

const minIoClient = new MinIo.Client({
  endPoint,
  port: 1 * port,
  accessKey,
  secretKey,
  useSSL: false,
  pathStyle: true,
});

module.exports = minIoClient;
