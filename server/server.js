// Packaged imports
import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Local imports
import mongoConnect from './utils/mongoConnect.js';

mongoConnect();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

mongoose.connection.once('open', () => {
  console.log('Connected to database');
  app.listen(process.env.PORT, function () {
    console.log(`Server is running on port : ${process.env.PORT}`);
  });
});
