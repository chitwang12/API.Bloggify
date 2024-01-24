require('dotenv').config();

const express  = require('express');
const connectDB = require('./config/db');
const PORT =  process.env.PORT || 3000;
const colors = require('colors');
const morgan = require('morgan');

const app = express();


//Connect to D
const db = connectDB();

app.listen(PORT,()=>{
    console.log(`Server is up!! and running at PORT ${PORT}`.cyan);
})
