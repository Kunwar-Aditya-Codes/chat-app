const router = require('express').Router();
const { createChat, getChat } = require('../controller/chatController');
const tokenVerifyHandler = require('../middleware/tokenVerifyHandler');

router.use((req, res, next) => {
  console.log('Chat route');
  next();
});

router.use(tokenVerifyHandler);

router.post('/', createChat);
router.get('/:userid', getChat);

module.exports = router;
