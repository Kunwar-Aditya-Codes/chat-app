const router = require('express').Router();
const { getSearchUser } = require('../controller/userController');
const verifyHandler = require('../middleware/verifyHandler');

router.use((req, res, next) => {
  console.log('User Route');
  next();
});

router.route('/').get(verifyHandler, getSearchUser);

module.exports = router;
