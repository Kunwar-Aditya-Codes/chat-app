const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const cors = require('cors');
const io = require('socket.io');
const cookieParser = require('cookie-parser');
require('express-async-errors');
require('dotenv').config();

// External modules
const connectDb = require('./utils/mongoConnect');
const corsOptions = require('./utils/corsConfig');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

connectDb(); // Connect to db before starting the server

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
// app.use(cors(corsOptions)); // CORS
app.use(errorHandler); // Error handler

// Routes
app.use('/api/auth', require('./view/authRoute'));
app.use('/api/user', require('./view/userRoute'));
app.use('/api/chat', require('./view/chatRoute'));
app.use('/api/message', require('./view/messageRoute'));

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

const ioSocket = io(server, {
  cors: {
    // origin: 'http://localhost:5173',
    origin: '*',
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

ioSocket.on('connection', (socket) => {
  console.log('User Connected');
  // When user connects
  socket.on('add-user', (userId) => {
    addUsers(userId, socket.id);
    ioSocket.emit('get-users', [...onlineUsers]);
  });

  // When user sends and receives message
  socket.on('send-message', ({ sender, receiverId, message, _id }) => {
    const user = getUser(receiverId);
    ioSocket.to(user).emit('get-message', {
      sender,
      message,
      _id,
    });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected');
    removeUsers(socket.id);
    ioSocket.emit('get-users', [...onlineUsers]);
  });
});
