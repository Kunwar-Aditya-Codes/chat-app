const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();

// External modules
const connectDb = require('./utils/mongoConnect');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;
const app = express();

connectDb(); // Connect to db before starting the server

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(errorHandler); // Error handler

// Routes
app.use('/api/auth', require('./view/authRoute'));

mongoose.connection.once('open', () => {
  console.log('Connected to db!');
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
});
