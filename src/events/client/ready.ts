import { Events } from 'discord.js'
import DiscordMusicBot from '../../structures/DiscordMusicBot'
import CEvent from '../../structures/CEvent'

module.exports = new CEvent({
  name: Events.ClientReady,
  executor: async (client: DiscordMusicBot) => {
    client.log.info(`Bot successfully logged in as ${client.user?.tag}!`)

    if (!client.config.dev) client.registerSlashCommands()
  },
})
