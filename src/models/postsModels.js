import 'dotenv/config'
import { ObjectId } from 'mongodb'
import dbConnect from '../config/dbConfig.js'

const connectionDb = await dbConnect(process.env.DB_CONNECTION_STRING)

export const getAllPosts = async () => {
  const db = connectionDb.db('imersao-alura')
  const collection = db.collection('posts')
  return await collection.find().toArray()
}

export const createPost = async post => {
  const db = connectionDb.db('imersao-alura')
  const collection = db.collection('posts')
  return await collection.insertOne(post)
}

export const updatingPost = async (id, post) => {
  const db = connectionDb.db('imersao-alura')
  const collection = db.collection('posts')
  const objID = ObjectId.createFromHexString(id)
  return await collection.updateOne(
    { _id: new ObjectId(objID) },
    { $set: post }
  )
}
