const blogRouter = require('express').Router()
//const { response } = require('../app')
//const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const tokenCheck = (token, user, response) => {
  if (!token || !user.username) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1}) 
  response.json(blogs)
  })
  
  blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    

    const token = request.token
    const user2 = request.user2
    const body = request.body
    checkToken(token, user2, response)

 
    //const user = await User.findById(body.userId)

    const note = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user2.id//user._id
    })
  
    //try{
      const savedNote = await note.save()
      user2.blogs = user2.blogs.concat(savedNote._id)
      await user2.save()
      response.status(201).json(savedNote)
    //} catch(exeption){next(exeption)}
   })

   blogRouter.delete('/:id', middleware.userExtractor, async (request, response)=> {

    const token = request.token
    const user = request.user2
    //console.log(user)

    checkToken(token, user, response)

    const blog = await Blog.findById(request.params.id)
    //console.log(blog)

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