const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', function (req, res) {
  res.send('Server up and running');
});

app.listen('3000', function () {
  console.log('Server Started !!');
});
