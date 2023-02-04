const blogRouter = require('express').Router()
//const { response } = require('../app')
//const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1}) 
  response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response) => {
    
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }
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

  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log(decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }
    
    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = await Blog.findById(request.params.id)
    console.log(blog)

    if(blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()

    }else{
      response.status(401).json({error: 'wrong user'})
    }


   })


  
  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    
  
    const updated = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    //console.log(updated)
    response.status(204).json(updated)
  })


module.exports = blogRouter