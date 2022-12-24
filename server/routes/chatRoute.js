const router = require('express').Router();
const verifyHandler = require('../middleware/verifyHandler');
const {
  createChat,
  getChat,
  createGroupChat,
  addUserGroupChat,
} = require('../controller/chatController');

router.use((req, res, next) => {
  console.log('Chat Route');
  next();
});

router.route('/').post(verifyHandler, createChat).get(verifyHandler, getChat);

router.route('/group').post(verifyHandler, createGroupChat);

router.route('/group/add').post(verifyHandler, addUserGroupChat);

module.exports = router;
