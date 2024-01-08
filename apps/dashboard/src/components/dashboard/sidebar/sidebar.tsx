'use client'

import Link from 'next/link'
import GuildsListBox from './sidebar-guilds'
import SidebarNowPlaying from './sidebar-now-playing'
import SidebarVoiceChannel from './sidebar-voice-channel'
import { useClientUser } from '@/hooks/use.clientUser'
import { useParams } from 'next/navigation'

const Sidebar = () => {
  const { clientUser } = useClientUser()
  const { guildId } = useParams() as { guildId: string }

  return (
    <aside className="flex flex-col justify-between w-96 bg-gray-900 p-6 pt-0 border-r border-gray-700">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col place-content-center h-[65px]">
          <Link
            href={`/dashboard/${guildId}`}
            className="flex flex-row space-x-3 justify-center"
          >
            <div className="relative h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {clientUser && (
                <img
                  className="h-9 w-9"
                  src={`${process.env.NEXT_PUBLIC_DISCORD_CDN_AVATARS}/${clientUser.id}/${clientUser.avatar}.png`}
                  alt=""
                />
              )}
            </div>
            <span className="flex items-center font-bold text-xl">Zhe_nU</span>
          </Link>
        </div>

        <GuildsListBox guildId={guildId} />
        <SidebarVoiceChannel guildId={guildId} />
      </div>

      <SidebarNowPlaying guildId={guildId} />
    </aside>
  )
}

export default Sidebar
