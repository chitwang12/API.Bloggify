require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const colors = require("colors");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const BlogsRoutes = require("./Routes/BlogsRoutes");
const UserRoutes = require("./Routes/UsersRoutes");

const app = express();

app.use(express.json());

//Connect to Database
db();

// use express-session middleware
app.use(
  session({
    secret: "session_Uid",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
  })
);
//Mounting the Blogs Route to BlogsRouter
app.use("/api/v1/blogs", BlogsRoutes);

//Mounting the User Route to UsersRouter
app.use("/api/v1/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is up!! and running at PORT ${PORT}`.cyan);
});
