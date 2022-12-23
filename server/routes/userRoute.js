const router = require('express').Router();
const { getSearchUser } = require('../controller/userController');

router.use((req, res, next) => {
  console.log('User Route');
  next();
});

router.route('/').get(getSearchUser);

module.exports = router;
