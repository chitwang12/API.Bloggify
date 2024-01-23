const express  = require('express');
const PORT =  process.env.PORT || 3000;
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require("dotenv");
const app = express();

dotenv.config("");

app.listen(PORT,()=>{
    console.log(`Server is up!! and running at PORT ${PORT}`.cyan);
})
