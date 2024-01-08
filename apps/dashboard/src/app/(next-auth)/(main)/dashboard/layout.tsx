import PlayerBar from '@/components/dashboard/playerbar/playerbar'
import Header from '@/components/dashboard/header/header'
import RightSidebar from '@/components/dashboard/right-sidebar/right-sidebar'
import Sidebar from '@/components/dashboard/sidebar/sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex justify-between min-h-0">
            {children}
            <RightSidebar />
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  )
}

export default DashboardLayout
