import Queue from '@/components/dashboard/queue/queue'

interface GuildPageProps {
  params: {
    guildId: string
  }
}

const GuildPage = ({ params }: GuildPageProps) => {
  return (
    <div className="flex-1 overflow-auto">
      <Queue guildId={params.guildId} />
    </div>
  )
}

export default GuildPage
