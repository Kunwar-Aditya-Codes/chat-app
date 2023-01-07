const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const io = require('socket.io');
const http = require('http');
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
app.use(cors(corsOptions)); // Enable CORS
app.use(errorHandler); // Error handler

// Routes
app.use('/api/auth', require('./view/authRoute'));
app.use('/api/user', require('./view/userRoute'));
app.use('/api/chat', require('./view/chatRoute'));
app.use('/api/message', require('./view/messageRoute'));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});

// const socket = io(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'http://localhost:5173',
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();

// socket.on('connection', (socket) => {
//   global.chatSocket = socket;
//   socket.on('add-user', (userId) => {
//     console.log('User connected: ' + userId);
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on('send-msg', (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit('msg-recieve', data);
//     }
//   });
// });
