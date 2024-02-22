const express = require('express')
const { getBlog, getBlogs, createBlog, deleteBlog, updateBlog } = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// GET 'blogs/' Public | Allow user to see all blogs
router.get('/', getBlogs)

// POST 'blogs/' Private | Allow loggedIn user to create a new blog
router.post('/', requireAuth, createBlog)

// GET 'blogs/:id' Private | Allow loggedIn user to see all info about a blog
router.get('/:id', requireAuth, getBlog)

// DELETE 'blogs/:id' Private | Allow loggedIn user to delete a blog
router.delete('/:id', requireAuth, deleteBlog)

// PATCH 'blogs/:id' Private | Allow loggedIn user to update a blog
router.patch('/:id', requireAuth, updateBlog)

module.exports = router