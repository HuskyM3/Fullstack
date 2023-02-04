const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { response } = require('../app')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}



const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  
    const authorization = request.get('authorization')
    //console.log(authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      //console.log(authorization)
      request.token = authorization.replace('Bearer ', '')
    }
    
  
  next()
}


const userExtractor = async (request, response, next) => {

  const token = request.token
  if (token){

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
    request.user2 = await User.findById(decodedToken.id)
    //return response.status(401).json({error: 'token invalid'})
  
}
next()

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
