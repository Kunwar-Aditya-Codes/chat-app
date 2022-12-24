const Message = require('../schema/Messages');
const User = require('../schema/User');
const Chat = require('../schema/Chat');

exports.sendMessage = async (req, res) => {
  const { chatId, message } = req.body;
  const { userId } = req;

  if (!chatId || !message)
    return res.status(400).json({ error: 'Chat id and message are required' });

  let newMessage = await Message.create({
    sender: userId,
    chat: chatId,
    text: message,
  });

  await newMessage.populate('sender', 'username profileImage');

  newMessage = await User.populate(newMessage, {
    path: 'chat.users',
    select: 'username email',
  });

  await Chat.findByIdAndUpdate(
    { _id: chatId },
    { latestMessage: newMessage },
    { new: true }
  );

  res.status(200).json(newMessage);
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) return res.status(400).json({ error: 'Chat id is required' });

  const messages = await Message.find({
    chat: chatId,
  })
    .populate('sender', 'username email profileImage')
    .sort({ createdAt: -1 });

  if (!messages) return res.status(400).json({ error: 'No messages found' });

  res.status(200).json(messages);
};

