import Discord from 'discord.js'
import colors from 'colors' // eslint-disable-line
import fs from 'node:fs'
import path from 'node:path'
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
express().get('/', (_, res) => res.send(true) ).listen(process.env.PORT || 3500)


import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const token = process.env.TOKEN

import { REST, Routes } from 'discord.js';
import { setupHandlers } from './utils/setupHandlers.js'

export const rest = new REST().setToken(token);


// DATABASE

const uri = process.env.MONGO_LINK

export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    let client = await mongoClient.connect();
    // let prod = mongoClient.db('prod')
    // let guilds = prod.collection('guilds')
  } finally {
    await mongoClient.close();
  }
}
run().catch(console.dir);

// ------



export const client = new Discord.Client({ intents: [
  Discord.GatewayIntentBits.Guilds,
  Discord.GatewayIntentBits.GuildMessages,
  Discord.GatewayIntentBits.MessageContent,
  Discord.GatewayIntentBits.GuildMembers,
  Discord.GatewayIntentBits.GuildPresences
] });

client.commands = new Discord.Collection()
export const commands = [] // Used to deploy commands

export const buttons = new Discord.Collection()
export const modals = new Discord.Collection()


setupHandlers(process.env.ID, process.env.DEV_GUILD_ID, process.env.MODE)

function startLogger() {
  console.log(`Started bot as ${client.user.username}!`.green.bold);
  console.log(('Bot has ' + client.commands.size + ' commands!').toString().blue)
  console.log(('Bot has ' + buttons.size + ' buttons handlers!').toString().blue)
  console.log(('Bot has ' + modals.size + ' modals handlers!').toString().blue)
  console.log('')
  console.log('I\'m in ' + Array.from(client.guilds.cache).length.toString().yellow + ' servers.')
}


// STARTING BOT ----- ----- ----- -----
console.log('... loading ...'.green)

client.on('ready', () => {
  startLogger()
});
// ----- ----- ----- ----- ----- ----- ----- -----


client.on('interactionCreate', async interaction => { // ALL HANDLERS

  if(interaction.isButton()) {
    
    let button = [...buttons].find(btn => btn[0].data.id === interaction.customId)[0]

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  } else if(interaction.isChatInputCommand()) {
    
    let command = interaction.client.commands.get(interaction.commandName);

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  } else if(interaction.isModalSubmit()) {

    let modal = [...modals].find(mdl => mdl[0].data.id === interaction.customId)[0]

    try {
      await modal.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  }

});

client.login(token);