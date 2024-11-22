import { MongoClient } from 'mongodb'

export default async function dbConnect(dbConnection) {
  let mongoClient

  try {
    mongoClient = new MongoClient(dbConnection)
    console.log('Conectando com DB')
    await mongoClient.connect()
    console.log('Conectado com DB')
    return mongoClient
  } catch (error) {
    console.error('Falha na conexão com DB', error)
    process.exit()
  }
}
