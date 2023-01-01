const Chat = require('../model/Chat');

// @route   POST api/chat
// @desc    Create a chat
// @access  Private
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

// @route   GET api/chat/:userid
// @desc    Get all chats
// @access  Private
exports.getChat = async (req, res) => {
  const { userid } = req.params;

  if (!userid) {
    return res.status(400).json({ msg: 'Missing fields' });
  }

  const foundChat = await Chat.find({
    users: { $in: [userid] },
  }).populate('users', 'username email profilePicture');

  if (!foundChat) {
    return res.status(400).json({ msg: 'No chats found' });
  }

  res.status(200).json(foundChat);
};

// ! Group Chat and Its Other Functions later
