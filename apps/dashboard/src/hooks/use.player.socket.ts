import { useSocket } from '@/components/providers/socket-provider'
import { Player } from '@/types/player'
import { useEffect, useState } from 'react'

type PlayerSocketProps = {
  guildId: string
}

export const usePlayerSocket = ({ guildId }: PlayerSocketProps) => {
  const { socket } = useSocket()

  const [player, setPlayer] = useState<Player>({
    duration: 0,
    isLooping: false,
    isMuted: false,
    isPlaying: false,
    isShuffled: false,
    position: 0,
    track: null,
  })

  const pause = () => {
    if (!socket) return
    socket.emit(`player:pause`, guildId)
  }

  const resume = () => {
    if (!socket) return
    socket.emit(`player:resume`, guildId)
  }

  const seek = (position: number) => {
    if (!socket) return
    socket.emit(`player:position`, guildId, position)
  }

  const skip = () => {
    if (!socket) return
    socket.emit(`player:skip`, guildId)
  }

  useEffect(() => {
    if (!socket) return
    
    socket.emit('player:get', guildId)

    socket.on('connect', () => {
      socket.emit('player:get', guildId)
    })

    socket.on(`player:${guildId}`, (data: any) => {
      setPlayer((prev) => ({
        ...prev,
        ...data,
      }))
    })

    socket.on(`player:${guildId}:isPlaying`, (isPlaying) => {
      setPlayer((prev) => ({
        ...prev,
        isPlaying,
      }))
    })

    socket.on(`player:${guildId}:position`, (position: number) => {
      setPlayer((prev) => ({
        ...prev,
        position,
      }))
    })

    return () => {
      socket.off(`connect`)
      socket.off(`player:${guildId}`)
      socket.off(`player:${guildId}:isPlaying`)
      socket.off(`player:${guildId}:position`)
    }
  }, [guildId, socket])

  return { player, pause, resume, seek, skip }
}
