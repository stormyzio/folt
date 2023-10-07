import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_LINK

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await mongoClient.connect()
const db = mongoClient.db('prod')


// const guilds = db.collection('guilds')
const users = db.collection('users')

await users.deleteMany()