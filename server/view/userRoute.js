const router = require('express').Router();
const { getUser, getLoggedInUser } = require('../controller/userController');

router.use((req, res, next) => {
  console.log('User route');
  next();
});

router.get('/:userId', getUser);
router.get('/', getLoggedInUser);

module.exports = router;
