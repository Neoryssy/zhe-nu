'use client'

import { usePlayerSocket } from '@/hooks/use.player.socket'
import Link from 'next/link'

type SidebarNowPlayingProps = {
  guildId: string
}

const SidebarNowPlaying = ({ guildId }: SidebarNowPlayingProps) => {
  const { player } = usePlayerSocket({ guildId })

  const nowPlaying = () => (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-bold">Сейчас играет:</h3>
      <div className="flex space-x-2">
        <Link
          className="flex max-h-20"
          target="_blank"
          href={player!.track!.info.uri}
        >
          <img
            className="h-full max-w-fit object-cover rounded"
            src={`https://img.youtube.com/vi/${player.track?.info.identifier}/default.jpg`}
            alt=""
          />
        </Link>

        <div className="flex flex-col justify-between">
          <Link href="#" className="line-clamp-2 text-sm font-bold">
            {player.track?.info.title}
          </Link>
          <span className="text-sm text-gray-300">
            Заказал: {player.track!.requester.displayName}
          </span>
        </div>
      </div>
    </div>
  )

  return <>{!!player.track ? nowPlaying() : null}</>
}

export default SidebarNowPlaying
