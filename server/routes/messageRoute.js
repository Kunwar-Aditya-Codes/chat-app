const router = require('express').Router();

router.use((req, res, next) => {
  console.log('Message Route');
  next();
});

module.exports = router;
