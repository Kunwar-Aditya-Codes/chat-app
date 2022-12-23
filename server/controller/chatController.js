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
