const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

global.onlineUsers = new Map();

const addUsers = (userId, socketId) => {
  !onlineUsers.has(userId) && onlineUsers.set(userId, socketId);
};

const removeUsers = (socketId) => {
  onlineUsers.forEach((value, key) => {
    if (value === socketId) {
      onlineUsers.delete(key);
    }
  });
};

const getUser = (userId) => {
  return onlineUsers.get(userId);
};

io.on('connection', (socket) => {
  console.log('User Connected');
  // When user connects
  socket.on('add-user', (userId) => {
    addUsers(userId, socket.id);
    io.emit('get-users', [...onlineUsers]);
  });

  // When user sends and receives message
  socket.on('send-message', ({ sender, receiverId, message, _id }) => {
    const user = getUser(receiverId);
    io.to(user).emit('get-message', {
      sender,
      message,
      _id,
    });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected');
    removeUsers(socket.id);
    io.emit('get-users', [...onlineUsers]);
  });
});
