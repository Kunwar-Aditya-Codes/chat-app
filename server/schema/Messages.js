const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },

    text: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
