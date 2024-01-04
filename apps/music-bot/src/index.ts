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
  GatewayIntentBits.GuildVoiceStates
]
const client = new DiscordMusicBot({ intents })

client.build()
