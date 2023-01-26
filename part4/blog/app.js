const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery',false)

//const mongoUrl = process.env.MONGODB_URI
//console.log('connecting to ', mongoUrl)
//mongoose.connect(mongoUrl)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use('/api/blogs', blogRouter)


module.exports = app