// config/db.js
require('dotenv').config(); // Add this line

const mongoose = require('mongoose');


// console.log(process.env.MONGODB_URI);

function connectDB() {
  mongoose.connect(process.env.MONGODB_URI, {
  });

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to MongoDB'.green);
  });

  return db;
}

module.exports = connectDB;
