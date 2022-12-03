const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID,
  brokers: [process.env.BROKERS, process.env.BROKERS]
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