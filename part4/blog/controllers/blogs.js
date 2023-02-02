const blogRouter = require('express').Router()
const { response } = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
  response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response, next) => {
    
    const body = request.body

    const note = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
  
    //try{
      const savedNote = await note.save()
      response.status(201).json(savedNote)
    //} catch(exeption){next(exeption)}
   })

   blogRouter.delete('/:id', async (request, response)=> {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
 
   })

module.exports = blogRouter