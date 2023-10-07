import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, Collection } from 'discord.js';
import { embedFooter, usersWithPerm } from '../utils/global.js';
import { addUser, addUserMoneyGuild } from '../utils/db/addUser.js';
import { mongoClient } from '../index.js';
import { BaseCardBuilder } from '../custom-libs/discord-card-canvas/dist/cards/base/base-card.js';

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
        username: targetUser.username,
        guild: interaction.guild
      })
      money = 0
    } else {
      if(users[0].money.find(g => g.guildId === interaction.guild.id)) {
        money = users[0].money.find(g => g.guildId === interaction.guild.id).money
      } else {
        await addUserMoneyGuild(targetUser.id, interaction.guild.id)
        money = 0
      }
      
    }

    const card = await new BaseCardBuilder({
      backgroundColor: { background: '#1b1b1b', waves: '#0ffb81'},
      mainText: { content: String(money), color: '#0ffb81' },
      nicknameText: { content: `${targetUser.username}\'s money`, color: 'white' },
      avatarImgURL: `https://cdn.discordapp.com/avatars/${targetUser.id}/${targetUser.avatar}.png`,
      avatarBorderColor: 'white',
      customLevelCard: true
    }).build()

    interaction.reply({
      files: [{ attachment: card.toBuffer(), name: 'canvas.png' }]
    })
		
	},
};