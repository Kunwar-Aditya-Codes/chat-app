const router = require('express').Router();
const { createChat, getChat } = require('../controller/chatController');

router.use((req, res, next) => {
  console.log('Chat route');
  next();
});

router.post('/', createChat);
router.get('/:chatid', getChat);

module.exports = router;
