import { Router } from 'express'
import discordClient from '../../../../bot/discordClient'

const router = Router()

router.get('/@me', (req, res) => {
  try {
    const user = discordClient.user

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.log('[USER_GET]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
})

router.get('/@me/guilds', (req, res) => {
  try {
    const guilds = discordClient.guilds.cache

    return res.status(200).json(guilds)
  } catch (error) {
    console.log('[GUILDS_GET]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
})

export default router
