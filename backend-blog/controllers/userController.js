const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const getTokenInfo = require('../middleware/getTokenInfo')
require('dotenv').config()

// POST '/login' Public | Allow user to login
async function loginUser(req, res) {
  try {
    // Check request body for correct properties
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required." });
    }
    // Search database for the username(unique)
    const user = await User.findOne({ username });
    // If no user in database has that username, respond with error
    if (!user) {
      return res.status(400).json({ error: "No user with that username exists" });
    }
    // If password doesn't match, respond with error (no hashing)
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }
    // If user found and credentials match, sign a token with the user.id and username, embedded in cookies
    jwt.sign({ username, id: user._id }, process.env.SECRET , {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        user_id: user._id,
        username,
        jwt_token: "Token has been embedded in cookies"
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// POST '/register' Public | Allow user to register
async function registerUser(req, res) {
  try {
    // Check request body for correct properties
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required." });
    }
    // Search database and if username found respond error, else create newUser
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ error: "Username already registered" });
    } else {
      const newUser = await User.create({username,password})
      res.json(newUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// GET '/logout' Private | Allow loggedIn user to logout
function logoutUser(req,res) {
  // Reset token to empty
  res.cookie('token', '').json({mssg: "Logout Successful"});
}

// GET '/profile' Private | Allow loggedIn user to get profile information
function getProfile(req, res) {
  // Extract information from auth token and return to user
  const { tokenUserId, tokenUsername } = getTokenInfo(req, res)
  // Could fetch more information from database from Id if needed
  res.json({ mssg: "Dashboard page", userid: tokenUserId, username: tokenUsername });
}

module.exports = { loginUser, registerUser, logoutUser, getProfile}