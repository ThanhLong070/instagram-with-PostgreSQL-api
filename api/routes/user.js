// @ts-nocheck
const { Router } = require('express');

const route = Router();

const passport = require('passport');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const userController = require('../../controllers/user');

module.exports = (app) => {
  app.use('/users', route);

  /**
   * @route GET /api/v1/users/profile_info
   * @desc Return user profile information
   * @access Private
   */
  route.get(
    '/profile_info',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(userController.getProfileInfo)
  );
};
