require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

// Create an Express Application
const app = express()

// Install Various Middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Route the API Endpoints
app.use('/blogs', blogRoutes)
app.use('', userRoutes)

// Connect to MongoDB Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Start Listening to Requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })