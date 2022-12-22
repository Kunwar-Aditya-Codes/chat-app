const express = require('express');

const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
} = require('../controller/authController');

router.use((req, res, next) => {
  console.log('Auth route');
  next();
});

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/refresh').get(refresh);

router.route('/logout').get(logout);

module.exports = router;
