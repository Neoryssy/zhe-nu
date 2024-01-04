import { Router } from 'express'
import discordClient from '../../../../bot/discordClient'
import { ChannelType } from 'discord.js'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const guild = await discordClient.guilds.cache.find(
      (g) => g.id === req.params.id
    )

    if (!guild) {
      return res.status(404).json({ message: 'Guild not found' })
    }

    return res.status(200).json(guild)
  } catch (error) {
    console.log('[GUILD_GET]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
})

router.get('/:id/channels', async (req, res) => {
  try {
    const { type } = req.body
    const guild = await discordClient.guilds.cache.get(req.params.id)

    if (!guild) {
      return res.status(404).json({ message: 'Guild not found' })
    }

    const voiceChannels = guild.channels.cache.filter((c) =>
      typeof type === 'number' ? c.type === type : true
    )

    return res.status(200).json(voiceChannels)
  } catch (error) {
    console.log('[CHANNELS_GET]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
})

export default router
