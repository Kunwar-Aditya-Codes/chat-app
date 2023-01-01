const router = require('express').Router();
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

router.post('/register', register);
router.post('/login', login);
router.get('/refresh', refresh);
router.get('/logout', logout);

module.exports = router;
