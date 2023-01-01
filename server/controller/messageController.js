const Message = require('../model/Message');

// @route   POST api/message
// @desc    Create a message
// @access  Private
exports.createMessage = async (req, res) => {
  const { message, sender, chatId } = req.body;

  if (!message || !sender || !chatId) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newMessage = new Message({
    message,
    sender,
    chatId,
  });

  const savedMessage = await newMessage.save();

  const populatedMessage = await Message.findById(savedMessage._id).populate(
    'sender',
    'username email profilePicture'
  );

  res.status(200).json(populatedMessage);
};

// @route   GET api/message/:chatid
// @desc    Get all messages from a chat
// @access  Private
exports.getMessages = async (req, res) => {};
