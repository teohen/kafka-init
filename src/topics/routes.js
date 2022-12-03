const kafkaManager = require('../commons/kafkaManager')

const kafkaAdmin = kafkaManager.getClientAdmin()

const routes = (app) => {
  app.get('/topics', async (req, res) => {
    try {
      const topics = await kafkaAdmin.listTopics()
      res.status(200).send(topics)
    } catch (err) {
      console.log('erro', err)
      res.sendStatus(500)
    }
  })

  app.post('/topics', async (req, res) => {
    const { body } = req
    try {
      await kafkaAdmin.createTopics({
        topics: [{
          topic: body.topicName,
          numPartitions: body.numPartitions,
          configEntries: [{ name: 'cleanup.policy', value: 'compact' }]
        }]
      })
      
      res.sendStatus(201)
    } catch (err) {
      console.log('erro', err)
      res.sendStatus(500)
    }
  })

  app.delete('/topics/:topicName', async (req, res) => {
    const { topicName } = req.params

    try {
      await kafkaAdmin.deleteTopics({
        topics: [topicName]
      })
      res.sendStatus(200)
    } catch (err) {
      console.log('erro', err)
      res.sendStatus(500)
    }
  })
}

module.exports = routes