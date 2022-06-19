// @ts-nocheck
const { Router } = require('express');

const route = Router();

const passport = require('passport');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const postController = require('../../controllers/post');

module.exports = (app) => {
  app.use('/posts', route);

  /**
   * @route Post /post
   * @desc Return new post data
   * @access Private
   */
  route.post(
    '/',
    // passport.authenticate('jwt', { session: false }),
    asyncMiddleware(postController.createPost)
  );
};
