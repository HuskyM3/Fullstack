//require('dotenv').config()
//const http = require('http')
const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')
//const mongoose = require('mongoose')

//const server = http.createServer(app)
/*
const express = require('express')
const app = express()
const cors = require('cors')
*/
//mongoose.set('strictQuery',false)
//app.use(cors())
//app.use(express.json())
//const mongoUrl = process.env.MONGODB_URI
//console.log('connecting to ', mongoUrl)
//mongoose.connect(mongoUrl)

/*
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
    console.log(blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

*/
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })

/*
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/