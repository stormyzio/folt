import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, Collection } from 'discord.js';
import { color, embedFooter, usersWithPerm } from '../utils/global.js';

export default {
	data: new SlashCommandBuilder()
		.setName('guild')
		.setDescription('Get infos on the guild and add the guild to the database'),

	async execute(interaction) {

		let users = await interaction.guild.members.fetch()

		let admins = await usersWithPerm(users)
		admins = admins.filter(admin => admin.user.bot != true)

		let bots = await users.map(user => user.user.bot)
		bots = bots.filter(bot => bot == true)

		let members = users.filter(user => user.user.bot != true)
		members = Array.from(members)
		let embed = new EmbedBuilder()
			.setColor(color())
			.setTitle('Guild informations')
			.setThumbnail(interaction.guild.iconURL({ size: 1024, extension: 'png' }))
			.addFields(
				{ name: 'Guild name', value: interaction.guild.name},
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Members', value: String(members.length), inline: true},
				{ name: 'Bots', value: String(bots.length), inline: true},
				{ name: 'Administrators', value: String(admins.length + 1), inline: true}, // + 1 = the guild owner
				// { name: 'Online users', value: String(onlineUsers.length)} // + 1 = the guild owner
			)
			.setFooter(embedFooter());

		let viewAdminsBtn = new ButtonBuilder()
			.setCustomId('viewAdmins')
			.setLabel('View Server Admins')
			.setStyle(ButtonStyle.Primary)

		const btnsRow = new ActionRowBuilder()
			.addComponents(viewAdminsBtn);

		await interaction.reply({
			content: '',
			embeds: [embed],
			components: [btnsRow]
		})
		
	},
};