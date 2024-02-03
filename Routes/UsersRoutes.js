const express = require('express');
const router = express.Router();
const User = require('../Models/users');
const bcrypt = require('bcrypt');
const UsersControllers = require('../Controllers/UserController');


// User Register
router.post('/signup',UsersControllers.registerUser);

//User Login 
router.post('/login',UsersControllers.login);

module.exports = router;