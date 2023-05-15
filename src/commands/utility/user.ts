import { GuildMember } from 'discord.js'
import { Command } from '../../structures/Command'

module.exports = new Command({
  name: 'user',
  description: 'Get information about the user',
  slashCommand: {
    enabled: true,
  },
  messageExecutor: async (client, message, args) => {
    try {
      client.log.info('Executing "ping" command...')
      await message.channel.send(`User ID: ${message.author.id}`)
      client.log.info('Executed "ping" command!')
    } catch (error) {
      client.log.error(error)
      await message.reply({
        content: 'There was an error while executing this command!',
      })
    }
  },
  interactionExecutor: async (client, interaction) => {
    const member = interaction.member as GuildMember
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt}.`
    )
  },
})
