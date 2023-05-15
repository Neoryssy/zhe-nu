import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

module.exports = new Command({
  name: 'ping',
  description: 'Pong!',
  slashCommand: {
    enabled: true,
  },
  messageExecutor: async (client, message, args) => {
    try {
      client.log.info('Executing "ping" command...')
      await message.reply('Pong!')
      client.log.info('Executed "ping" command!')
    } catch (error) {
      client.log.error(error)
      await message.reply({
        content: 'There was an error while executing this command!',
      })
    }
  },
  interactionExecutor: async (client, interaction) => {
    await interaction.reply('Pong!')
  }
})
