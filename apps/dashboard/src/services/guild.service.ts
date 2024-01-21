import { GuildVoiceChannel, RESTPartialGuild } from '@/types/bot-api'
import { PartialGuild } from '@/types/guild'
import axios from 'axios'
import { getSession } from 'next-auth/react'

const getClientGuilds = async (): Promise<PartialGuild[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/@client/guilds`
    )

    return res.data
  } catch (error) {
    console.log('[GET_CLIENT_GUILDS]', error)
    return []
  }
}
const getCurrentUserGuilds = async (): Promise<PartialGuild[]> => {
  try {
    const session = await getSession()
    const res = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    })

    if (res.status !== 200) {
      return []
    }

    return res.data
  } catch (error) {
    console.log('[GET_CURRENT_USER_GUILDS]', error)
    return []
  }
}
const getCurrentUserGuildsWithClient = async (): Promise<PartialGuild[]> => {
  try {
    const clientGuilds = await getClientGuilds()
    const userGuilds = await getCurrentUserGuilds()

    const intersection = clientGuilds.filter((clientGuild) =>
      userGuilds.some((userGuild) => userGuild.id === clientGuild.id)
    )

    return intersection
  } catch (error) {
    console.log('[GET_CURRENT_USER_GUILDS]', error)
    return []
  }
}

const getCurrentUserManagedGuilds = async (): Promise<RESTPartialGuild[]> => {
  try {
    const session = await getSession()
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/@me/managed-guilds`,
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    )

    if (res.status !== 200) {
      return []
    }

    return res.data
  } catch (error) {
    console.log('[GET_CURRENT_USER_MANAGED_GUILDS]', error)
    return []
  }
}

const getGuildVoiceChannels = async (
  guildId: string
): Promise<GuildVoiceChannel[]> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}/channels`,
      {
        params: {
          type: 2,
        },
      }
    )

    return res.data
  } catch (error) {
    console.log('[GET_CLIENT_GUILDS]', error)
    return []
  }
}

export const GuildService = {
  getClientGuilds,
  getCurrentUserGuilds,
  getCurrentUserGuildsWithClient,
  getCurrentUserManagedGuilds,
  getGuildVoiceChannels,
}
