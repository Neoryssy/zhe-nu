'use client'

import { useGuild } from '@/hooks/use.guild'
import { useQueueSocket } from '@/hooks/use.queue.socket'
import { useUser } from '@/hooks/use.user'
import { DiscordTrack } from '@/types/bot-api'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type RightSidebarProps = {
  guildId: string
}

type SearchResponse = {
  loadType:
    | 'TRACK_LOADED'
    | 'PLAYLIST_LOADED'
    | 'SEARCH_RESULT'
    | 'NO_MATCHES'
    | 'LOAD_FAILED'
  playlistInfo: {
    name?: string
    selectedTrack?: number
  }
  tracks: DiscordTrack[]
}

const RightSidebar = ({ guildId }: RightSidebarProps) => {
  const { user } = useUser()

  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState<DiscordTrack[]>([])

  const handleEnqueue = (track: DiscordTrack) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/queue/${guildId}/enqueue`, {
      ...track,
      userId: user?.id,
    })
  }

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (!query) {
        setVideos([])
        return
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}`
      )
      const data = res.data as SearchResponse

      if (data.loadType === 'PLAYLIST_LOADED') {
        return
      }

      setVideos(data.tracks)
    }, 500)

    return () => {
      clearTimeout(timeOut)
    }
  }, [query])

  return (
    <div className="w-96 bg-gray-900 border-l border-gray-700 overflow-auto">
      <div className="flex flex-col space-y-5 p-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            className="w-full bg-gray-800 p-3 pr-10 rounded"
          />
          <button
            type="submit"
            className="absolute flex items-center inset-y-0 right-0 px-3"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>

        {videos.map((item) => (
          <div key={item.track} className="flex flex-col space-y-3">
            <Link href={item.info.uri} target="_blank">
              <img
                className="max-h-48 object-cover w-full rounded"
                src={`https://img.youtube.com/vi/${item.info.identifier}/maxresdefault.jpg`}
                alt=""
              />
            </Link>
            <div className="flex justify-between items-start space-x-3">
              <h4 className="line-clamp-2 font-bold cursor-default">
                {item.info.title}
              </h4>
              <button
                onClick={() => {
                  handleEnqueue(item)
                }}
                className="flex items-center whitespace-nowrap bg-blue-600 p-3 rounded hover:bg-blue-700"
              >
                В очередь
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSidebar
