'use client'

import GuildList from '@/components/dashboard/guild-list/guild-list'
import { GuildService } from '@/services/guild.service'
import { RESTPartialGuild } from '@/types/bot-api'
import { PartialGuild } from '@/types/guild'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const [guilds, setGuilds] = useState<RESTPartialGuild[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const guilds = await GuildService.getCurrentUserManagedGuilds()

      setGuilds(guilds)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col items-center space-y-12">
      <h1 className="text-3xl font-bold text-center">Выбрать сервер</h1>
      {isLoading ? (
        <div className="animate-spin h-12 w-12 rounded-full border-b-2"></div>
      ) : (
        <GuildList guilds={guilds} />
      )}
    </div>
  )
}

export default DashboardPage
