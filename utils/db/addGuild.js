import { mongoClient } from "../../index.js";

export async function addGuild(guild) {
  await mongoClient.connect()
  const db = mongoClient.db('prod')
  const guilds = db.collection('guilds')
  await guilds.insertOne({
    _id: guild.id,
    name: guild.name,
  }) 
}