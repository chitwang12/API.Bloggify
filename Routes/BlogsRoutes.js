const express = require('express');
const router = express.Router();
const BlogController =  require('../Controllers/BlogController');
 

//Get all Blogs 
router.get('/', BlogController.getAllBlogs);

//Get A Single Route 
router.get('/:id',BlogController.getBlogById);

//Create a Blog 
router.post('/create',BlogController.createBlog);

//Update a Blog 
router.put('/update/:id',BlogController.updateBlogById);

//Delete all Blog 
router.delete('/delete',BlogController.deleteAllBlogs);

//Delete a blog 
router.delete('/delete/:id',BlogController.deleteBlogById);


module.exports = router;