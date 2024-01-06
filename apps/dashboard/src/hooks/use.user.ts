import { UserService } from '@/services/user.service'
import { User } from '@/types/bot-api'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await UserService.getCurrentUser()

      setUser(user)
      setIsLoading(false)
    }

    fetchCurrentUser()
  }, [])

  return { user, isLoading }
}
