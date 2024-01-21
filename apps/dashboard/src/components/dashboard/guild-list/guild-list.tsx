import { RESTPartialGuild } from '@/types/bot-api'
import { PartialGuild } from '@/types/guild'
import { useRouter } from 'next/navigation'

type GuildListProps = {
  guilds: RESTPartialGuild[]
}

const GuildList = ({ guilds }: GuildListProps) => {
  const router = useRouter()

  const handleAddGuild = (guildId: string) => {
    window.open(
      `https://discord.com/oauth2/authorize?scope=bot+applications.commands&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/callback/guild-oauth&permissions=3147792&client_id=${process.env.NEXT_PUBLIC_DISCORD_ID}&guild_id=${guildId}`,
      '_blank',
      'location=yes,height=650,width=520,scrollbars=yes,status=yes'
    )

    window.addEventListener('message', (event) => {
      if (event.data.type === 'CHANGE_URL') {
        router.push(event.data.url)
      }
    })
  }

  const handleToGuild = (guildId: string) => {
    router.push(`/dashboard/${guildId}`)
  }

  return (
    <div className="grid grid-cols-3 gap-10 w-full">
      {guilds.map((guild) => (
        <div key={guild.id} className="flex flex-col space-y-3">
          <div className="flex relative justify-center items-center bg-gray-900 h-40 overflow-hidden rounded-md">
            <div
              className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-30 scale-125 blur"
              style={
                guild.icon
                  ? {
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_DISCORD_CDN_ICONS}/${guild.id}/${guild.icon})`,
                    }
                  : undefined
              }
            ></div>
            {guild.icon ? (
              <img
                className="h-[4.5rem] w-[4.5rem] border-2 rounded-full z-10"
                src={`${process.env.NEXT_PUBLIC_DISCORD_CDN_ICONS}/${guild.id}/${guild.icon}`}
                alt=""
              />
            ) : (
              <div className="flex h-[4.5rem] w-[4.5rem] justify-center items-center font-bold text-2xl border-2 rounded-full z-10">
                {guild.name[0]}
              </div>
            )}
          </div>
          <div className="flex justify-between items-start space-x-2">
            <div className="flex flex-col justify-between space-y-1">
              <h3 className="font-bold text-sm line-clamp-1">{guild.name}</h3>
              <span className="text-xs text-gray-300">
                {guild.owner
                  ? 'Владелец'
                  : guild.bot_master
                  ? 'Бот-мастер'
                  : 'Пользователь'}
              </span>
            </div>

            {guild.bot ? (
              <button
                onClick={() => {
                  handleToGuild(guild.id)
                }}
                className="flex items-center bg-blue-600 p-2 rounded"
              >
                Перейти
              </button>
            ) : (
              <button
                onClick={() => handleAddGuild(guild.id)}
                className="flex items-center bg-green-600 p-2 rounded"
              >
                Добавить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GuildList
