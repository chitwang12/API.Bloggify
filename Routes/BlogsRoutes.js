const express = require('express');
const router = express.Router();
const BlogController =  require('../Controllers/BlogController');
const isAuthenticated = require('../Middleware/authMiddleware');
 

//Get all Blogs 
router.get('/', isAuthenticated ,BlogController.getAllBlogs);

//Get A Single Route 
router.get('/:id',BlogController.getBlogById);

//Create a Blog 
router.post('/create',isAuthenticated,BlogController.createBlog);

//Update a Blog 
router.put('/update/:id',isAuthenticated,BlogController.updateBlogById);

//Delete all Blog 
router.delete('/delete',isAuthenticated,BlogController.deleteAllBlogs);

//Delete a blog 
router.delete('/delete/:id',isAuthenticated,BlogController.deleteBlogById);


module.exports = router;