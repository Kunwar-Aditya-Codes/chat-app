const router = require('express').Router();
const verifyHandler = require('../middleware/verifyHandler');
const { sendMessage, getMessages } = require('../controller/messageController');

router.use((req, res, next) => {
  console.log('Message Route');
  next();
});

router.route('/').post(verifyHandler, sendMessage);

router.route('/:chatId').get(verifyHandler, getMessages);

module.exports = router;
