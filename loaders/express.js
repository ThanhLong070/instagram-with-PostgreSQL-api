// @ts-nocheck
const express = require('express');
const cors = require('cors');
const routes = require('../api');
const Logger = require('./logger');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const rateLimiter = require('../api/middlewares/limiter');
const variables = require('../constants/variables');
const statusCode = require('../constants/statusCode');
const response = require('../constants/response');
const logEvents = require('../utils/logEvents');
const { v4 } = require('uuid');

module.exports = (app) => {
  app.get('/status', (req, res) => res.status(200).end());
  app.head('/status', (req, res) => res.status(200).end());

  app.enable('trust proxy');

  // Use JSON, XML, urlencoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(express.static(__dirname + '/'));
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require('../configs/passport')(passport);

  app.use(cors());

  // Load API routes and Rate limiter
  app.use('/api/v1', rateLimiter(), routes());

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    response.NOT_FOUND();
  });

  app.use((err, req, res, next) => {
    const log = `🔥 ${v4()} [ ${req.method} ${req.path} ] : ${err.message}`;
    logEvents(log);
    Logger.error(log);

    let status = err.status || statusCode.INTERNAL_SERVER_ERROR,
      message = err.message || variables.COMMON.INTERNAL_SERVER_ERROR,
      nameCode = err.nameCode || variables.NAME_CODE.API.INTERNAL_SERVER_ERROR,
      errorCode =
        err.errorCode || variables.ERROR_CODE.API.INTERNAL_SERVER_ERROR;

    res
      .status(status)
      .json({ success: false, status, message, nameCode, errorCode });
  });
};
