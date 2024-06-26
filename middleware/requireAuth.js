const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config()

// Authorisation Middleware that analyses incoming requests for JWT Token 
const requireAuth = async (req, res, next) => {
  // If auth token present, store the token string in const token
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
  const token = authorization.split(' ')[1]

  // Decode the token for user_id and lookup user in database, if (user) = next(), else = err
  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({ _id }).select('_id')
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth