import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '../../structures/Command'

module.exports = new Command({
  name: 'ping',
  description: "Check the bot's ping",
  slashCommand: {
    enabled: true,
  },
  messageExecutor: async (client, message, args) => {
    const sent = await message.reply('Pinging...')
    await sent.edit(
      `Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`
    )
  },
  interactionExecutor: async (client, interaction) => {
    const sent = await interaction.reply({
      content: 'Pinging...',
      fetchReply: true,
    })
    await interaction.editReply(
      `Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`
    )
  },
})
