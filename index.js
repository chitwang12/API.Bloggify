require('dotenv').config();
const express  = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const PORT =  process.env.PORT || 3000;
const colors = require('colors');
const morgan = require('morgan');
const Blog = require('./Models/blogs');
const BlogsRoutes = require('./Routes/BlogsRoutes');
const UserRoutes = require('./Routes/UsersRoutes');


const app = express();

app.use(express.json()); 

//Connect to Database
db();

//Mounting the Blogs Route to BlogsRouter
app.use('/api/v1/blogs', BlogsRoutes);

//Mounting the User Route to UsersRouter
app.use('/api/v1/users',UserRoutes);


app.listen(PORT,()=>{
    console.log(`Server is up!! and running at PORT ${PORT}`.cyan);
})
