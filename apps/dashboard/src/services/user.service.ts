import { User } from '@/types/bot-api'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const UserService = {
  async getCurrentUser(): Promise<User | null> {
    const session = await getSession()

    if (!session) {
      return null
    }

    const token = session.access_token
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/@me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.status !== 200) {
      return null
    }

    const user = res.data

    return user
  },
}
