const express = require('express')
const { loginUser, registerUser, logoutUser, getProfile} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// POST '/login' Public | Allow user to login
router.post('/login', loginUser)

// POST '/register' Public | Allow user to register
router.post('/register', registerUser)

// GET '/logout' Private | Allow loggedIn user to logout
router.get('/logout', requireAuth, logoutUser)

// GET '/profile' Private | Allow loggedIn user to get profile information
router.get('/profile', requireAuth, getProfile)

module.exports = router