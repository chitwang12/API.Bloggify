require('dotenv').config();

const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGODB_URI)
.then(() =>{
    console.log('Successfully connected to the database');
})
.catch((err) =>{
   console.log('Error in connecting to Mongo-Db ' , err);
})

module.exports = db ;