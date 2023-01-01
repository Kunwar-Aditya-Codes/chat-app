const router = require('express').Router();
const {
  createMessage,
  getMessages,
} = require('../controller/messageController');

router.use((req, res, next) => {
  console.log('Message route');
  next();
});

router.post('/', createMessage);
router.get('/:chatId', getMessages);

module.exports = router;
