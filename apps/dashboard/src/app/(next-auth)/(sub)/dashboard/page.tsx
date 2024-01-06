'use client'

import GuildList from '@/components/dashboard/guild-list/guild-list'
import { GuildService } from '@/services/guild.service'
import { PartialGuild } from '@/types/guild'
import { useEffect, useState } from 'react'

interface DashboardPageData {
  clientGuilds: PartialGuild[]
  userGuilds: PartialGuild[]
  isLoading: boolean
}

const fetchGuilds = async (): Promise<DashboardPageData> => {
  const clientGuilds = await GuildService.getClientGuilds()
  const userGuilds = await GuildService.getCurrentUserGuilds()

  return {
    clientGuilds,
    userGuilds,
    isLoading: false,
  }
}

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardPageData>({
    clientGuilds: [],
    userGuilds: [],
    isLoading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGuilds()
      setDashboardData(data)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col items-center space-y-12">
      <h1 className="text-3xl font-bold text-center">Выбрать сервер</h1>
      {dashboardData.isLoading ? (
        <div className="animate-spin h-12 w-12 rounded-full border-b-2"></div>
      ) : (
        <GuildList
          clientGuilds={dashboardData.clientGuilds}
          userGuilds={dashboardData.userGuilds}
        />
      )}
    </div>
  )
}

export default DashboardPage
