'use client'

import { useVoiceStateSocket } from '@/hooks/use.voiceState.socket'
import { GuildService } from '@/services/guild.service'
import { GuildVoiceChannel } from '@/types/bot-api'
import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

type SidebarVoiceChannelProps = {
  guildId: string
}

const SidebarVoiceChannel = ({ guildId }: SidebarVoiceChannelProps) => {
  const { getGuildVoiceChannels } = GuildService

  const { joinChannel, leaveChannel, voiceState } = useVoiceStateSocket({
    guildId,
  })

  const [channels, setChannels] = useState<GuildVoiceChannel[]>([])

  const selectChannel = async (channel: GuildVoiceChannel) => {
    await joinChannel(guildId, channel.id)
  }

  useEffect(() => {
    const fetchChannels = async () => {
      const channels = await getGuildVoiceChannels(guildId)
      setChannels(channels)
    }

    fetchChannels()
  }, [guildId])

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Listbox value={voiceState?.channel || null} onChange={selectChannel}>
          <Listbox.Button className="flex justify-between items-center w-full text-sm text-gray-500 bg-gray-950 py-2 px-4 rounded-lg">
            {!!voiceState?.channel
              ? voiceState?.channel.name
              : 'Присоединиться к голосовому каналу'}
          </Listbox.Button>

          <Listbox.Options className="flex flex-col p-2 mt-1 max-h-90 w-full overflow-auto rounded-md bg-gray-950 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {channels.map((channel, idx) => (
              <Listbox.Option
                key={idx}
                value={channel}
                className={({ active }) =>
                  classNames(
                    active ? 'bg-gray-800 text-white' : 'text-gray-300',
                    'flex cursor-pointer justify-between items-center w-full rounded-lg'
                  )
                }
              >
                <div className="p-2">{channel.name}</div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>

        {voiceState?.channel && (
          <button
            className="self-start text-sm text-red-500 p"
            onClick={() => {
              leaveChannel(guildId)
            }}
          >
            Выйти из канала
          </button>
        )}
      </div>
    </div>
  )
}

export default SidebarVoiceChannel
