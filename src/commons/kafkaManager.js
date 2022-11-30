const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092']
})

const admin = kafka.admin()
const producer = kafka.producer()

const getProducer = () => {
  return producer
}

const createConsumer = (groupId) => {
  return kafka.consumer({ groupId })
}

const getClientAdmin = () => {
  return admin
}



module.exports = {
  getProducer,
  createConsumer,
  getClientAdmin
}