import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'
import { usersWithPerm } from '../../utils/global.js'

export default {
  data: {
    name: 'View Admins',
    description: 'View all server\'s admins',
    id: 'viewAdmins'
  },
  async execute(interaction) {

    let users = await interaction.guild.members.fetch()
    let admins = await usersWithPerm(users)
    admins = admins.filter(admin => admin.user.bot != true)
    
    let cleanAdmins = admins.map(admin => {
      return `**${admin.displayName}** · ${admin.user.username}`
    })

    await interaction.reply({
      content: `**All server admins**:\n\n${cleanAdmins.join('\n')}`,
      ephemeral: true
    })

  }
}