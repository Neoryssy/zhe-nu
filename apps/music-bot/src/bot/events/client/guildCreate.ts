import { Events, Guild } from 'discord.js'
import CEvent from '../../../structures/CEvent'
import SlashCommandsManager from '../../../utils/SlashCommandsManager'

module.exports = new CEvent({
  name: Events.GuildCreate,
  executor: async (client, guild: Guild) => {
    client.log.info(`New guild joined: ${guild.name} (${guild.id})`)
    try {
      await new SlashCommandsManager(client).setGuildSlashCommands(guild)
      client.log.info(
        `Slash commands for guild ${guild.name} (${guild.id}) registered`
      )
    } catch (error) {
      client.log.error(error)
    }
  },
})
