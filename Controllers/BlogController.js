const Blog = require("../Models/blogs");

//Get all Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      mssg:"Success !! ",
      count : blogs.length,
      data: blogs
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

//Get one blog by ID
exports.getBlogById = async (req, res) => {
try {
  const blogId = req.params.id;
   const blog = await Blog.findById(blogId);

   if(!blog){
    return res.status(404).json({
      msg:'Blog with particular Id , not found '
    })
   }

   res.status(200).json({
    msg:'Success !!!',
    data : blog
   })
  
} catch (error) {
  console.error(error);
  res.status(500).json({
    error: "Internal Server Error ",
  });
}
};

//Create  a Blog
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      likes,
      comments,
      author: { name, email },
    } = req.body;

    //validate the required fields
    if (!title || !content || !name || !email) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    //Create a new blog feature
    const newBlog = new Blog({
      title,
      content,
      likes: likes || 0,
      comments: comments || [],
      author: {
        name,
        email,
      },
    });
    const savedBlog = await newBlog.save();

    //Respond with the created Blog
    res.status(201).json({ message: "Success ", savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error ",
    });
  }
};
// *****************

//Update one blog by Id
exports.updateBlogById = async (req, res) => {
  const blogId = req.params.id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId,req.body,{new : true, runValidators:true});
    if(!updatedBlog){
      return res.status(404).json({
        mssg:'Blog not found'
      })
    }res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete one blog by ID
exports.deleteBlogById = async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if(!deletedBlog){
      return res.status(404).json({
        mssg: 'Blog not found '
      })
    }

    return res.status(200).json({
      msg:'Blog deleted Successfully'
    })
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete all blogs
exports.deleteAllBlogs = async (req, res) => {
  try {
    // Delete all blogs
    const deletedBlogs = await Blog.deleteMany();

    if (deletedBlogs.deletedCount === 0) {
      return res.status(404).json({ message: 'No blogs found to delete' });
    }

    res.json({ message: 'All blogs deleted successfully', deletedBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};