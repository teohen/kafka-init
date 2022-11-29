const express = require('express')

const { kafkaManager } = require('./src/commons')
const { topicsRoutes } = require('./src/topics')

const app = express()
app.use(express.json())

const PORT = 3000

const kafkaAdmin = kafkaManager.getClientAdmin()

kafkaAdmin.connect();

topicsRoutes(app)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})