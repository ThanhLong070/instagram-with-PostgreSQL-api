// @ts-nocheck
const { Router } = require('express');

const route = Router();

const passport = require('passport');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const userController = require('../../controllers/user');

module.exports = (app) => {
  app.use('/users', route);

  /**
   * @route GET /users/:id
   * @desc Return current user profile
   * @access Private
   */
  route.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(userController.getProfile)
  );
};
