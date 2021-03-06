// @ts-nocheck
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const routes = require('../api');
const Logger = require('./logger');
const passport = require('passport');

module.exports = (app) => {
  app.get('/status', (req, res) => res.status(200).end());
  app.head('/status', (req, res) => res.status(200).end());

  app.enable('trust proxy');

  // Use JSON, XML, urlencoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Passport middleware
  app.use(passport.initialize());
  // Passport config
  require('../configs/passport')(passport);

  app.use(cors());

  // Load API routes
  app.use('/api/v1', routes());

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError.NotFound(`Sorry, this route isn't available.`));
  });

  app.use((err, req, res, next) => {
    Logger.error(`🔥 [  ${req.path}  ] : ${err.message} `);

    res.json({
      success: false,
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
      // errorCode: err.errorCode || err.status,
    });
  });
};
