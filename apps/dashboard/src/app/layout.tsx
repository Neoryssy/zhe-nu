import { Inter } from 'next/font/google'
import './globals.scss'
import { FC, PropsWithChildren } from 'react'
import { SocketProvider } from '@/components/providers/socket-provider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zhe_nU',
  description: 'Discord music bot',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className="bg-gray-800">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  )
}

export default RootLayout
