const express = require('express');

const router = express.Router();

const { createMessage } = require('../controller/messageController');

router.use((req, res, next) => {
  console.log('Message route');
  next();
});

router.route('/').post(createMessage);

module.exports = router;
