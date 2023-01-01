const router = require('express').Router();
const {
  createMessage,
  getMessages,
} = require('../controller/messageController');
const tokenVerifyHandler = require('../middleware/tokenVerifyHandler');

router.use((req, res, next) => {
  console.log('Message route');
  next();
});

router.use(tokenVerifyHandler);

router.post('/', createMessage);
router.get('/:chatId', getMessages);

module.exports = router;
