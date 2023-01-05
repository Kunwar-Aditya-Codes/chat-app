const router = require('express').Router();
const {
  getUser,
  getLoggedInUser,
  searchUsers,
} = require('../controller/userController');
const tokenVerifyHandler = require('../middleware/tokenVerifyHandler');

router.use((req, res, next) => {
  console.log('User route');
  next();
});

router.use(tokenVerifyHandler);

router.get('/search', searchUsers);
router.get('/:userId', getUser);
router.get('/', getLoggedInUser);

module.exports = router;
