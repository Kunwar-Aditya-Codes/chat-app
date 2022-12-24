const router = require('express').Router();
const verifyHandler = require('../middleware/verifyHandler');
const {
  createChat,
  getChat,
  createGroupChat,
  addUserGroupChat,
  getUsersGroupChat,
  removeUserGroupChat,
} = require('../controller/chatController');

router.use((req, res, next) => {
  console.log('Chat Route');
  next();
});

router.route('/').post(verifyHandler, createChat).get(verifyHandler, getChat);

router
  .route('/group')
  .post(verifyHandler, createGroupChat)
  .get(verifyHandler, getUsersGroupChat)
  .delete(verifyHandler, removeUserGroupChat);

router.route('/group/add').post(verifyHandler, addUserGroupChat);

module.exports = router;
