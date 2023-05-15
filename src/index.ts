import * as dotenv from 'dotenv'
dotenv.config()
import { GatewayIntentBits } from 'discord.js'
import DiscordMusicBot from './structures/DiscordMusicBot'

process.on('uncaughtException', (err) => {
  console.error(err)
  process.exit(1)
})
process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
]
const client = new DiscordMusicBot({ intents })

const token = client.config.dev
  ? process.env.DISCORD_DEV_TOKEN
  : process.env.DISCORD_TOKEN
if (!token) {
  client.log.error('Not provided DISCORD_TOKEN or DISCORD_DEV_TOKEN in .env')
  process.exit(1)
}

client.build(token)
