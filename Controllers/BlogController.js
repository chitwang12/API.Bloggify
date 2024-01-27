const Blog = require("../Models/blogs");

//Get all Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200, { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

//Get one blog by ID
exports.getBlogById = async (req, res) => {};

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
exports.updateBlogById = async (req, res) => {};

// Delete one blog by ID
exports.deleteBlogById = async (req, res) => {};

// Delete all blogs
exports.deleteAllBlogs = async (req, res) => {};
