const User = require('../Models/users');
const bcrypt = require('bcrypt');
const workFactor = 10;

exports.login = async (req, res) => {
    try {
      const { UserName, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ UserName });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({
          error: 'Invalid username or password',
        });
      }
  
      // Compare the provided password with the hashed password using bcrypt.compare
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // Check if the passwords match
      if (!passwordMatch) {
        return res.status(401).json({
          error: 'Invalid Username / Password',
        });
      }
      //storing the user data in session
        req.session.user ={
            id:user._id,
            UserName :user.UserName
        }

      return res.status(200).json({
        message: 'Login Successful',
        user: req.session.user,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed. Please try again' });
    }
  };
  

exports.registerUser = async (req, res) => {
  try {
    const { UserName, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ UserName });

    if (existingUser) {
      return res.status(400).json({ error: `Username is already Registered! , Please log in with the same UserName` });
    }

    // Wrap bcrypt.hash in a Promise to use async/await
    const hashPassword = (password) => {
      return new Promise((resolve, reject) => {
        bcrypt.hash(password, workFactor, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    };

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ UserName, password: hashedPassword });

    res.status(201).json({
      message: 'User Created Successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.name === 'ValidationError') {
      // Handle validation errors
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: validationErrors });
    }

    res.status(500).json({ error: 'SignUp Failed. Please try again' });
  }
};
