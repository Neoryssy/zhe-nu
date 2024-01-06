import axios from 'axios'
import { useEffect, useState } from 'react'

type GuildProps = {
  guildId: string
}

export const useGuild = ({ guildId }: GuildProps) => {
  const [guild, setGuild] = useState<null>(null)

  useEffect(() => {
    const fetchGuild = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/guilds/${guildId}`
      )

      if (res.status !== 200) {
        return
      }

      setGuild(res.data)
    }

    fetchGuild()
  }, [])

  return { guild }
}
