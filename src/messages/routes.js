const kafkaManager = require('../commons/kafkaManager')
const crypto = require('crypto');

const producer = kafkaManager.getProducer()

const routes = (app) => {
  app.post('/messages', async (req, res) => {
    const randomKey = crypto.randomUUID()

    try {
      const { body: schedules } = req

      schedules.forEach(async (schedule) => {
        const { message } = schedule
        await producer.send({
          topic: schedule.topic,
          messages: [{
            "key": message.key || randomKey,
            "value": JSON.stringify(message.value),
            "headers": message.headers
          }]
        })
        console.log(`message sent to topic: ${schedule.topic} / value: ${message.value}`)
      });

      res.sendStatus(201)
    } catch (err) {
      console.log('erro', err)
      res.sendStatus(500)
    }
  })
}

module.exports = routes