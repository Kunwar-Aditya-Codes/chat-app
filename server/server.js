const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = require('./utils/mongoConnect');

const PORT = process.env.PORT || 5000;
const app = express();

connectDb();

mongoose.connection.once('open', () => {
  console.log('Connected to db!');
  app.listen(PORT, () => {
    console.log(`Server started on PORT:${PORT}`);
  });
});
