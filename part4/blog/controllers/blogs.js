const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
  response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    
    const body = request.body

    const note = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
  
    const savedNote = await note.save()
    response.status(201).json(savedNote)
    /*
    const blog = new Blog(request.body)
    console.log(blog)
    const result = await blog.save()
    response.status(201).json(result)
  */
  })

module.exports = blogRouter