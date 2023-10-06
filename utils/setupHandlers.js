// Add all imports for the function setupHandlers
import { client, buttons, commands, modals } from '../index.js';
import { __dirname } from '../index.js';
import fs from 'node:fs';
import path from 'node:path';
import { rest } from '../index.js';
import { Routes } from 'discord.js';

export function setupHandlers(applicationID, devGuildID, mode) {

  (async () => { // COMMANDS HANDLERS
    // Adding commands to the Discord Commands Collection
  
    const commandsPath = path.join(__dirname, 'commands'); // /commands
    const commandFiles = fs.readdirSync(commandsPath)
      .filter(file => file.endsWith('.js'));
  
    for (const file of commandFiles) {
      let filePath = path.join(commandsPath, file); // /commands/cmd.js
      let command = await import(filePath); // command
      command = command.default
  
      if ('data' in command && 'execute' in command) { // command is valid?
        client.commands.set(command.data.name, command); // add command to collection
        commands.push(command.data.toJSON()); // add command to commands array
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`.yellow);
      }
    }
  
    // Deploying commands:
  
    (async () => {
      console.log('deploying')
      try {
        if(mode === 'DELETE') {
          console.log('Deleting all commands...'.yellow)
          console.log('')
          await rest.put(
            Routes.applicationCommands(applicationID, { body: [] })
          )
          
        } else if(mode === 'DEV') {
          console.log('Deploying commands for Dev Guild...'.yellow)
          console.log('')
          await rest.put(
            Routes.applicationGuildCommands(applicationID, devGuildID), // Deploy the commands for the dev guild only
            { body: commands },
          );

        } else if(mode === 'PROD') {
          console.log('Deploying commands for all Guilds!'.yellow)
          console.log('')
          await rest.put(
            Routes.applicationCommands(applicationID),
            { body: commands } // Deploy the commands globally
          );

        } else if(mode === 'SOFT_DELETE') {
          console.log('Deleting commands for Dev Guild...'.yellow)
          console.log('')
          await rest.put(
            Routes.applicationGuildCommands(applicationID, devGuildID), // Deploy the commands for the dev guild only
            { body: [] },
          );

        }
      } catch (error) {
        console.error(error);
      }
    })();
  })();
  
  (async () => { // BUTTONS HANDLERS
    // Adding buttons handlers to the buttons array
  
    const buttonsPath = path.join(__dirname, 'handlers/buttons'); // /buttons
    const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js')); // all files in /buttons with .js
  
    for (const file of buttonFiles) {
      let filePath = path.join(buttonsPath, file); // /buttons/file.js
      let button = await import(filePath); // button
      button = button.default
  
      if ('data' in button && 'execute' in button) { // button is valid?
        buttons.set(button); // add button to collection
      } else {
        console.log(`[WARNING] The button at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  })();
  
  (async () => { // MODALS HANDLERS
    // Adding modals handlers to the modals array
  
    const modalsPath = path.join(__dirname, 'handlers/modals'); // /modals
    const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js')); // all files in /modals with .js
  
    for (const file of modalFiles) {
      let filePath = path.join(modalsPath, file); // /modals/file.js
      let modal = await import(filePath); // modal
      modal = modal.default
  
      if ('data' in modal && 'execute' in modal) { // modal is valid?
        modals.set(modal); // add modal to collection
      } else {
        console.log(`[WARNING] The modal at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  })();
}