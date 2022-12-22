const Message = require('../schema/Message');

exports.createMessage = async (req, res) => {
  const { message, sender, receiver } = req.body;

  if (!message || !sender || !receiver) {
    return res.status(400).json({
      message: 'Please fill in all fields',
    });
  }

  const foundChat = await Message.findOne({
    sender,
    receiver,
  })
    .lean()
    .exec();

  if (!foundChat) {
    const newMessge = new Message({
      message: [message],
      sender: sender,
      receiver: receiver,
    });

    const savedMessage = await newMessge.save();

    if (savedMessage) {
      return res.status(200).json({
        message: 'Message sent',
      });
    } else {
      return res.status(400).json({
        message: 'Message not sent',
      });
    }
  }

  const updatedChat = await Message.findOneAndUpdate(
    {
      sender: sender,
      receiver: receiver,
    },
    {
      $push: {
        message: message,
      },
    },
    {
      new: true,
    }
  );

  if (updatedChat) {
    return res.status(200).json({
      message: 'Message sent',
    });
  }

  return res.status(400).json({
    message: 'Message not sent',
  });
};
