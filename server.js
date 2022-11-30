require('dotenv').config()
const express = require('express')

const { kafkaManager } = require('./src/commons')
const { topicsRoutes } = require('./src/topics')
const { messagesRoutes } = require('./src/messages')

const app = express()
app.use(express.json())

const PORT = process.env.PORT

const kafkaAdmin = kafkaManager.getClientAdmin()
const kafkaProducer = kafkaManager.getProducer()

kafkaAdmin.connect()
kafkaProducer.connect()

topicsRoutes(app)
messagesRoutes(app)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})