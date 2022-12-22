const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
