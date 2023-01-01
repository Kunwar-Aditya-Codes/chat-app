const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
