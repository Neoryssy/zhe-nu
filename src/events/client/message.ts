import { ChannelType, Events, Message } from 'discord.js'
import DiscordMusicBot from '../../structures/DiscordMusicBot'
import CEvent from '../../structures/CEvent'

module.exports = new CEvent({
  name: Events.MessageCreate,
  executor: async (client: DiscordMusicBot, message: Message) => {
    try {
      if (message.author.bot) return
      if (message.channel.type === ChannelType.DM) return

      const prefix = client.config.defaultPrefix

      if (!message.content.startsWith(prefix)) return

      const args = message.content.slice(prefix.length).trim().split(/ +/)
      const commandName = args.shift()!.toLowerCase()

      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        )

      if (!command) return

      try {
        await command.messageExecute(client, message, args)
      } catch (error) {
        client.log.error(`There was an error while executing command "${command.name}"!`)
        client.log.error(error)

        message.reply({
          content: 'Произошла ошибка при выполнении команды!',
        })
      }
    } catch (error) {
      console.log(this)
      client.log.error(error)
    }
  },
})
