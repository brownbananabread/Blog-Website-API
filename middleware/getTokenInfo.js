const jwt = require('jsonwebtoken')
require('dotenv').config()

// Authorisation function that returns either a decoded token or err
function getTokenInfo(req, res) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    const { id, username } = jwt.verify(token, process.env.SECRET);
    // Extract two objects and return
    return { tokenUserId: id, tokenUsername: username };
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = getTokenInfo