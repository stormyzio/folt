import { mongoClient } from "../../index.js";

export async function addUser(user) {
  await mongoClient.connect()
  const db = mongoClient.db('prod')
  const users = db.collection('users')
  await users.insertOne({
    _id: user.id,
    name: user.username,
    money: [
      user.guild &&{
        guildId: user.guild.id,
        money: 0
      }
    ]
  }) 
  console.log('Added a new user to the database!')
}