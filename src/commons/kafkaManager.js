const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092', 'localhost:9092']
})

const kafkaAdmin = kafka.admin()

const createProducer = () => {
  return kafka.producer();
}

const createConsumer = (groupId) => {
  return kafka.consumer({ groupId })
}

const getClientAdmin = () => {
  return kafkaAdmin
}

module.exports = {
  createProducer,
  createConsumer,
  getClientAdmin
}