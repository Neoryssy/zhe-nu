import { Socket } from 'socket.io'
import { QueueSocketEmitter } from '../emitters/queue.emitter'

export const queueListeners = (socket: Socket) => {
  socket.on('queue:get', (guildId: string) => {
    QueueSocketEmitter.emitQueue(guildId)
  })
}
