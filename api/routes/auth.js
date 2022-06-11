const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const authController = require('../../controllers/auth');

module.exports = (app) => {
  app.use('/auth', route);

  /**
   * @route POST /auth/signUp
   * @desc Sign up user
   * @access Public
   */
  route.post('/signUp', asyncMiddleware(authController.signUp));

  /**
   * @route POST /auth/signIn
   * @desc Sign in user / Returning JWT token
   * @access Public
   */
  route.post('/signIn', asyncMiddleware(authController.signIn));
};
