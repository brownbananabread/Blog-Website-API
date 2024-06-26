const Blog = require('../models/blogModel')
const mongoose = require("mongoose");
const getTokenInfo = require('../middleware/getTokenInfo')
require('dotenv').config()


// GET 'blogs/' Public | Allow user to see all blogs
async function getBlogs(req,res) {
  // Return all blogs with author username and Id
  const blogs = await Blog.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(20)
  res.status(200).json({mssg: "Public All Blogs Page", blogs})
}

// GET 'blogs/:id' Private | Allow loggedIn user to see all info about a blog
async function getBlog(req,res) {
  // Extract relevant information about user and desired blog
  const { tokenUserId, tokenUsername } = getTokenInfo(req, res)
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No blog exists with that id'})
  }
  // Search database for that blog
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json({error: 'No blog exists with that id'})
  }
  // If the usersId matches the author's userId then return true (added functionality to come...)
  if (blog.author.toHexString() === tokenUserId){
    res.status(200).json({mssg: "Private Single Blog Page", blog, belongsToUser: true })
  } else {
    res.status(200).json({mssg: "Private Single Blog Page", blog, belongsToUser: false })
  }
}

// POST 'blogs/' Private | Allow loggedIn user to create a new blog
async function createBlog(req,res) {
  // Extract relevant information about user and blog they want to create
  const { tokenUserId, tokenUsername } = getTokenInfo(req, res)
  try {
    const {title,summary,content} = req.body
    let emptyFields = []
    if(!title) {
      emptyFields.push('title')
    }
    if(!summary) {
      emptyFields.push('summary')
    }
    if(!content) {
      emptyFields.push('content')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    // Create a new blog using json properties and the userId from the token
    const blog = await Blog.create({
      title,
      summary,
      content,
      author: tokenUserId})
    res.status(200).json({page: "Private Create Blog Page", mssg: "Blog Created", blog })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// DELETE 'blogs/:id' Private | Allow loggedIn user to delete a blog
async function deleteBlog(req,res) {
  // Extract relevant information about user and blog they want to create
  const { tokenUserId, tokenUsername } = getTokenInfo(req, res)
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog'})
  }
  // Search database for blog
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json({error: 'No such blog'})
  }
  // Only if the userId and author Id match can the user delete the blog
  if (blog.author.toHexString() === tokenUserId){
    const blogToDelete = await Blog.findOneAndDelete({_id: id})
    res.status(200).json({page: "Private Delete Blog Page", mssg: "Blog Deleted", blogToDelete })
  } else {
    return res.status(400).json({error: 'You dont own the blog'})
  }
}

// PATCH 'blogs/:id' Private | Allow loggedIn user to update a blog
async function updateBlog(req,res) {
  // Extract relevant information about user and blog they want to create
  const { tokenUserId, tokenUsername } = getTokenInfo(req, res)
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No blog exists with that id'})
  }
  // Search database for blog
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json({error: 'No blog exists with that id'})
  }
  if (blog.author.toHexString() === tokenUserId){
    try {
      // Extract relevant information about user and blog they want to create
      const {title,summary,content} = req.body
      let emptyFields = []
      if(!title) {
        emptyFields.push('title')
      }
      if(!summary) {
        emptyFields.push('summary')
      }
      if(!content) {
        emptyFields.push('content')
      }
      if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
      }
    // Update the blog(id) with new information
    const blogToUpdate = await Blog.findOneAndUpdate({_id: id}, {
      title,
      summary,
      content
    })
    // Refetch the blog to get the updated information
    const updatedBlog = await Blog.findById(id)
    res.status(200).json({page: "Private Update Blog Page", mssg: "Blog Updated", updatedBlog })
  } catch {
    return res.status(400).json({error: 'You dont own the blog'})
  }
}}

module.exports = { getBlog, getBlogs, createBlog, deleteBlog, updateBlog }