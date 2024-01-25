const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        maxLength:200,
        required:true
    },
    likes:{
        type:Number,
        default:0,
    },
    comments:[
        {
            text: {
              type: String,
              required: true,
            },
            author: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
        }
    ],
    author:{
        name:{
            type:String,
            required:true,
        },
        email: {
            type: String,
            required: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        }
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;