const Chat = require('../model/Chat');
const User = require('../model/User');

// @route   POST api/chat
// @desc    Create a chat
// @access  Public
exports.createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ msg: 'Missing fields' });
  }

  const foundChat = await Chat.findOne({
    users: { $all: [senderId, receiverId] },
  });

  if (foundChat) {
    const populatedChat = await Chat.findById(foundChat._id).populate(
      'users',
      'username email profilePicture'
    );

    return res.status(200).json(populatedChat);
  }

  const newChat = new Chat({
    users: [senderId, receiverId],
  });

  const savedChat = await newChat.save();

  const populatedChat = await Chat.findById(savedChat._id).populate(
    'users',
    'username email profilePicture'
  );

  res.status(200).json(populatedChat);
};

// @route   GET api/chat/:chatid
// @desc    Get all chats
// @access  Public
exports.getChat = async (req, res) => {};
