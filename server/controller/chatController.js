const Chat = require('../schema/Chat');
const User = require('../schema/Messages');

exports.createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: 'User id is required' });

  let foundChat = await Chat.findOne({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: req.userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  foundChat = await User.populate(foundChat, {
    path: 'latestMessage.sender',
    select: '-password',
  });

  if (foundChat) {
    console.log('foundChat');
    return res.status(200).json(foundChat);
  }

  const newChat = await Chat.create({
    chatName: 'sender',
    users: [req.userId, userId],
    isGroup: false,
  });

  const populatedChat = await Chat.findOne({ _id: newChat._id }).populate(
    'users',
    '-password'
  );

  res.status(200).json(populatedChat);
};

exports.getChat = async (req, res) => {
  let foundChat = await Chat.findOne({
    users: {
      $elemMatch: { $eq: req.userId },
    },
  })
    .populate('users', '-password')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });

  foundChat = await User.populate(foundChat, {
    path: 'latestMessage.sender',
    select: '-password',
  });

  if (!foundChat) return res.status(400).json({ error: 'Chat not found' });

  res.status(200).json(foundChat);
};

exports.createGroupChat = async (req, res) => {
  const { chatName, users } = req.body;

  if (!chatName || !users)
    return res.status(400).json({ error: 'Chat name and users are required' });

  if (users.length < 2)
    return res.status(400).json({ error: 'Add at least two users' });

  users.push(req.userId);

  const newChat = await Chat.create({
    chatName,
    users,
    isGroup: true,
  });

  const populatedChat = await Chat.findOne({ _id: newChat._id }).populate(
    'users',
    '-password'
  );

  res.status(200).json(populatedChat);
};

exports.addUserGroupChat = async (req, res) => {
  const { chatId, users } = req.body;

  if (!chatId || !users)
    return res.status(400).json({ error: 'Chat id and users are required' });

  const foundChat = await Chat.findOne({ _id: chatId });

  if (!foundChat) return res.status(400).json({ error: 'Chat not found' });

  if (!foundChat.isGroup)
    return res.status(400).json({ error: 'Chat is not a group' });

  const usersInChat = users.filter((user) => {
    return foundChat.users.includes(user);
  });

  if (usersInChat.length > 0)
    return res.status(201).json({ message: 'Users are already in the chat' });

  const newUsers = [...foundChat.users, ...users];

  const updatedChat = await Chat.findOneAndUpdate(
    { _id: chatId },
    { users: newUsers },
    { new: true }
  ).populate('users', '-password');

  res.status(200).json(updatedChat);
};


