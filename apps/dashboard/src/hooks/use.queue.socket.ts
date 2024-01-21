import { useSocket } from '@/components/providers/socket-provider'
import { DiscordTrack } from '@/types/bot-api'
import { useEffect, useState } from 'react'

type QueueSocketProps = {
  guildId: string
}

export const useQueueSocket = ({ guildId }: QueueSocketProps) => {
  const { socket } = useSocket()
  const [queue, setQueue] = useState<DiscordTrack[]>([])

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

  return { queue }
}
