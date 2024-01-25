const express = require('express');
const router = express.Router();
const BlogController =  require('../Controllers/BlogController');
 

//Get all Blogs 
router.get('/', BlogController.getAllBlogs);


module.exports = router;