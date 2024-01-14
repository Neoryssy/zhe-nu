'use client'

import { Session } from 'next-auth'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const MainPage = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  const handleSignIn = () => {
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

    signIn('discord', {
      callbackUrl,
      redirect: true,
    })
  }

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div />

      <div className="flex flex-col items-center space-y-5">
        <div className='relative'>
          <h1 className="font-bold text-9xl">Zhe_nU</h1>
          <span className='absolute -top-5 -right-14 text-2xl'>Beta</span>
        </div>

        <h3 className="text-3xl">Музыкальный бот</h3>
        
        <div className="flex justify-center">
          {isLoading ? (
            <button
              disabled
              onClick={handleSignIn}
              className="flex items-center bg-blue-600 font-bold text-3xl p-5 rounded-lg"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2"></div>
            </button>
          ) : session?.access_token ? (
            <Link
              href="/dashboard"
              className="flex items-center bg-blue-600 font-bold text-3xl p-5 rounded-lg"
            >
              Войти в панель управления
            </Link>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center bg-blue-600 font-bold text-3xl p-5 rounded-lg"
            >
              Войти через Discord
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end w-full p-3">
        <span className="text-gray-300">
          Created by{' '}
          <Link className="font-bold" href="https://github.com/Neoryssy">
            Neoryssy
          </Link>
        </span>
      </div>
    </div>
  )
}

export default MainPage
