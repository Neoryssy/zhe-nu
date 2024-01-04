import { Router } from 'express'
import { DiscordTrack, IDiscordTrack } from '../../../../structures/Dispatcher'
import discordClient from '../../../../bot/discordClient'

const router = Router()

router.post('/:id/enqueue', async (req, res) => {
  try {
    const body = req.body as IDiscordTrack & { userId: string }
    const guildId = req.params.id
    const user = await discordClient.users.fetch(body.userId)

    if (!user) {
      return res.status(400).end()
    }

    const track = new DiscordTrack({
      ...body,
      requester: user,
    })

    const dispatcher = discordClient.subscription.get(guildId)

    if (!dispatcher) {
      return res.status(200).end()
    }

    dispatcher.enqueue(track)
    await dispatcher.tryPlay()

    res.status(200).end()
  } catch (error) {
    console.log('[PLAYER_POST]', error)
    return res.status(500).json({ message: 'Internal Error' })
  }
})

export default router
