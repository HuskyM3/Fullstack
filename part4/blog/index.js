//require('dotenv').config()
//const http = require('http')
const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')
//const mongoose = require('mongoose')



app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
