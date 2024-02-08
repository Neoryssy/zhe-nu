import { Socket } from 'socket.io'
import { QueueSocketEmitter } from '../emitters/queue.emitter'
import discordClient from '../../../bot/discordClient'

export const queueListeners = (socket: Socket) => {
  socket.on('queue:get', (guildId: string) => {
    QueueSocketEmitter.emitQueue(guildId)
  })

  socket.on('queue:moveTrack', (guildId: string, from: number, to: number) => {
    const dispatcher = discordClient.subscription.get(guildId)

    if (!dispatcher) {
      return
    }

    dispatcher.moveTrack(from, to)
    QueueSocketEmitter.emitQueue(guildId)
  })  
}
