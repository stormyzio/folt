import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, Collection } from 'discord.js';
import { embedFooter, usersWithPerm } from '../utils/global.js';
import { addUser } from '../utils/db/addUser.js';
import { mongoClient } from '../index.js';

export default {
	data: new SlashCommandBuilder()
		.setName('money')
		.setDescription('Show your money of money of a specific user.')
    .addUserOption(option => 
      option
        .setName('target')
        .setDescription('The user to see his money')
        .setRequired(false)
    ),

	async execute(interaction) {

    const target = interaction.options.getUser('target')
    const targetUser = target || interaction.user

    await mongoClient.connect()
    const db = mongoClient.db('prod')
    const guilds = db.collection('users')
    let users = guilds.find({ _id: targetUser.id })
    users = await users.toArray()
    let money;
    if(users.length == 0) {
      addUser({
        id: targetUser.id,
        username: targetUser.username
      })
      money = 0
    } else {
      money = users[0].money
    }

    let embed = new EmbedBuilder()
			.setColor('Orange')
			.setTitle(`${targetUser.username}'s money:`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/${targetUser.id}/${targetUser.avatar}.png`)
			.setDescription(`${money}`)
			.setFooter(embedFooter());

		await interaction.reply({
			content: '',
			embeds: [embed],
		})
		
	},
};