const { Router } = require('express');

const auth = require('./routes/auth');
const user = require('./routes/user');
const post = require('./routes/post');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  user(app);
  post(app);

  return app;
};
