require('dotenv').config();


const mongoose = require('mongoose');

function connectDB() {
  // console.log(process.env.MONGODB_URI);

  const uri = process.env.MONGODB_URI;

  mongoose.connect(uri, {
  });

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.error('MongoDB Connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB !! '.green);
  });

}

module.exports = connectDB;


