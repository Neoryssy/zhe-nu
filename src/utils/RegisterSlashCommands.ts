import DiscordMusicBot from '../structures/DiscordMusicBot'
import { REST, Routes, SlashCommandBuilder } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'
import { Command } from '../structures/Command'

/**
 * Registers global slash commands or guild slash commands if guildId is provided
 */
export default async (client: DiscordMusicBot, guildId?: string) => {
  if (!client.token || !client.application) {
    client.log.warn('Slash commands are not registered.')
    client.log.warn('No client.token or client.application was found.')
    return
  }

  const commands = []
  client.log.info('Grabing slash commands...')

  const ext = client.config.dev ? '.ts' : '.js'
  const foldersPath = path.join(__dirname, '..', 'commands')
  const commandFolders = fs.readdirSync(foldersPath) as string[]

  for (const folder of commandFolders) {
    const commandPath = path.join(foldersPath, folder)
    const commandFiles = fs
      .readdirSync(commandPath)
      .filter((file) => file.endsWith(ext)) as string[]

    for (const file of commandFiles) {
      const filePath = path.join(commandPath, file)
      const command = require(filePath) as Command
      if (command.slashCommand.enabled) {
        const data = new SlashCommandBuilder()
          .setName(command.name)
          .setDescription(command.description)
        commands.push(data)
        client.log.info(`Grabbed slash command "${command.name}" data`)
      }
    }
  }

  const rest = new REST().setToken(client.token)

  try {
    client.log.info(
      `Started refreshing ${commands.length} application slash commands.`
    )

    const route = guildId
      ? Routes.applicationGuildCommands(client.application.id, guildId)
      : Routes.applicationCommands(client.application.id)
    const data = await rest.put(route, { body: commands })

    client.log.info(
      // @ts-ignore
      `Successfully reloaded ${data.length.toLocaleString()} application slash commands.`
    )
  } catch (error) {
    client.log.error(error)
  }
}
