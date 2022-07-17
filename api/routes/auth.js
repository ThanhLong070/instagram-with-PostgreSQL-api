const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const authController = require('../../controllers/auth');

module.exports = (app) => {
  app.use('/auth', route);

  /**
   * @route POST /api/v1/auth/signup
   * @desc Signup user
   * @access Public
   */
  route.post('/signup', asyncMiddleware(authController.signup));

  /**
   * @route POST /api/v1/auth/refresh_token
   * @desc Refresh token / Returning JWT token
   * @access Public
   */
  route.post('/refresh_token', asyncMiddleware(authController.refreshToken));

  /**
   * @route POST /api/v1/auth/login
   * @desc Login user / Returning JWT token
   * @access Public
   */
  route.post('/login', asyncMiddleware(authController.login));

  /**
   * @route DELETE /api/v1/auth/logout
   * @desc Logout user
   * @access Public
   */
  route.delete('/logout', asyncMiddleware(authController.logout));
};
