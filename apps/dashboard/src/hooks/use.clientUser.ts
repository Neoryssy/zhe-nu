import { ClientUser } from '@/types/bot-api'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const useClientUser = () => {
  const [clientUser, setClientUser] = useState<ClientUser | null>(null)

  useEffect(() => {
    const fetchClientUser = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/@client`
      )

      setClientUser(res.data)
    }

    fetchClientUser()
  }, [])

  return { clientUser }
}
