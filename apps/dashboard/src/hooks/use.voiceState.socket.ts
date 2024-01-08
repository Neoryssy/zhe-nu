import { useSocket } from '@/components/providers/socket-provider'
import { GuildVoiceState } from '@/types/bot-api'
import axios from 'axios'
import { GatewayVoiceState } from 'discord-api-types/v10'
import { useEffect, useState } from 'react'

type VoiceStateSocketProps = {
  guildId: string
}

export const useVoiceStateSocket = ({ guildId }: VoiceStateSocketProps) => {
  const { socket } = useSocket()
  const [voiceState, setVoiceState] = useState<GuildVoiceState | null>(null)

  const joinChannel = (guildId: string, channelId: string) => {
    if (!socket) return

    socket.emit(`voiceState:joinChannel`, { channelId, guildId })
  }

  const leaveChannel = (guildId: string) => {
    if (!socket) return

    socket.emit(`voiceState:leaveChannel`, guildId)
  }

  useEffect(() => {
    if (!socket) return

    socket.emit('voiceState:get', guildId)

    socket.on('connect', () => {
      socket.emit('voiceState:get', guildId)
    })

    socket.on(`voiceState:${guildId}`, (data: any) => {
      setVoiceState(data)
    })

    return () => {
      socket.off(`connect`)
      socket.off(`voiceState:${guildId}`)
    }
  }, [guildId, socket])

  return { voiceState, joinChannel, leaveChannel }
}
