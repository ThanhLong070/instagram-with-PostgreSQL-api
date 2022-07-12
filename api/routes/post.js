// @ts-nocheck
const { Router } = require('express');

const route = Router();

const passport = require('passport');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const postController = require('../../controllers/post');

module.exports = (app) => {
  app.use('/posts', route);

  // TODO: CRUD
  // C
  /**
   * @route Post/api/v1/posts
   * @desc Return new post data
   * @access Private
   */
  route.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(postController.createPost)
  );

  // R
  /**
   * @route Get /api/v1/posts
   * @desc Return the current account list post
   * @access Private
   */
  route.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(postController.getPosts)
  );

  // U
  /**
   * @route Patch /api/v1/posts/:postId
   * @desc Return the post updated current account
   * @access Private
   */
  route.patch(
    '/:postId',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(postController.patchPostById)
  );

  // D
  /**
   * @route Delete /api/v1/posts/:postId
   * @desc Return status of method
   * @access Private
   */
  route.delete(
    '/:postId',
    passport.authenticate('jwt', { session: false }),
    asyncMiddleware(postController.deletePostById)
  );
};
