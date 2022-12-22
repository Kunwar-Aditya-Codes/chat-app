// Packaged imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const http = require('http');

require('express-async-errors');
dotenv.config();

// Local imports
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./utils/corsOptions');
const mongoConnect = require('./utils/mongoConnect');

mongoConnect();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(errorHandler);

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/message', require('./routes/messageRoute'));

mongoose.connection.once('open', () => {
  console.log('Connected to database');
  app.listen(process.env.PORT, function () {
    console.log(`Server is running on port:${process.env.PORT}`);
  });
});
