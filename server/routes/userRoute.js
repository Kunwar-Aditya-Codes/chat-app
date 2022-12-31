const router = require('express').Router();
const {
  getSearchUser,
  getLoggedInUser,
} = require('../controller/userController');
const verifyHandler = require('../middleware/verifyHandler');

router.use((req, res, next) => {
  console.log('User Route');
  next();
});

router.route('/').get(verifyHandler, getSearchUser);

router.route('/loggedin').get(verifyHandler, getLoggedInUser);

module.exports = router;
