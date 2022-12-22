const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: [String],
      required: true,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
