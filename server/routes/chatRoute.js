const router = require('express').Router();
const verifyHandler = require('../middleware/verifyHandler');
const { createChat, getChat } = require('../controller/chatController');

router.use((req, res, next) => {
  console.log('Chat Route');
  next();
});

router.route('/').post(verifyHandler, createChat).get(verifyHandler, getChat);

module.exports = router;
