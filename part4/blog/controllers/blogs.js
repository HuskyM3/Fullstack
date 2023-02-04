const blogRouter = require('express').Router()
//const { response } = require('../app')
//const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1}) 
  response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    
    const body = request.body
    const user = await User.findById(body.userId)

    const note = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    //try{
      const savedNote = await note.save()
      user.blogs = user.blogs.concat(savedNote._id)
      await user.save()
      response.status(201).json(savedNote)
    //} catch(exeption){next(exeption)}
   })

   blogRouter.delete('/:id', async (request, response)=> {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
   })


  
  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    
  
    const updated = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    //console.log(updated)
    response.status(204).json(updated)
  })


module.exports = blogRouter