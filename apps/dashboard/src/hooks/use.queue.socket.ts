import { useSocket } from '@/components/providers/socket-provider'
import { DiscordTrack } from '@/types/bot-api'
import { useEffect, useState } from 'react'

type QueueSocketProps = {
  guildId: string
}

export const useQueueSocket = ({ guildId }: QueueSocketProps) => {
  const { socket } = useSocket()
  const [queue, setQueue] = useState<DiscordTrack[]>([])

  const clearQueue = () => {
    if (!socket) return
    socket.emit('queue:clear', guildId)
  }

  const moveTrack = (from: number, to: number) => {
    if (!socket) return
    socket.emit('queue:moveTrack', guildId, from, to)
  }

  const removeTrack = (index: number) => {
    if (!socket) return
    socket.emit('queue:removeTrack', guildId, index)
  }

  useEffect(() => {
    if (!socket) return

    socket.emit('queue:get', guildId)

    socket.on('connect', () => {
      socket.emit('queue:get', guildId)
    })

    socket.on(`queue:${guildId}`, (data: DiscordTrack[]) => {
      setQueue(data)
    })

    return () => {
      socket.off(`connect`)
      socket.off(`queue:${guildId}`)
    }
  }, [guildId, socket])

  return { queue, clearQueue, moveTrack, removeTrack }
}
