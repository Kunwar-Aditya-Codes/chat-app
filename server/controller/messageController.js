const Message = require('../schema/Message');

exports.createMessage = async (req, res) => {
  const { message, senderId, receiverId } = req.body;

  const messageExists = await Message.findOne({
    users: { $all: [senderId, receiverId] },
  });

  if (!messageExists) {
    const newMessage = new Message({
      message,
      users: [senderId, receiverId],
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      savedMessage,
    });
  } else {
    messageExists.message.push(message);

    const updatedMessage = await messageExists.save();

    res.status(201).json({
      updatedMessage,
    });
  }
};

exports.getMessages = async (req, res) => {};
