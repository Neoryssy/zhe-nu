import {
  ApplicationCommandOptionType,
  Guild,
  GuildMember,
  TextBasedChannel,
} from 'discord.js'
import { Command } from '../../structures/Command'
import { DiscordTrack } from '../../structures/Dispather'
import { isValidURL } from '../../utils/URL'

module.exports = new Command({
  name: 'play',
  description: 'Plays a song',
  slashCommand: {
    enabled: true,
    options: [
      {
        name: 'query',
        description: 'The song to play',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  async executor(client, ctx, args) {
    try {
      const channel = ctx.channel as TextBasedChannel
      const guild = ctx.guild as Guild
      const member = ctx.member as GuildMember
      const query = args.join(' ')
      const res = await client.subsription.search(query)
      const voice = member.voice.channel
      let dispatcher = client.subsription.get(guild.id)
      if (!dispatcher) {
        if (!voice) {
          ctx.sendMessage('Необходимо находиться в голосовом канале')
          return
        } else {
          dispatcher = await client.subsription.create(guild, channel, voice)
        }
      }

      switch (res?.loadType) {
        case 'LOAD_FAILED': {
          ctx.sendMessage('Произошла ошибка во время поиска трека')
          return
        }
        case 'NO_MATCHES': {
          ctx.sendMessage('Ничего не найдено')
          return
        }
        case 'PLAYLIST_LOADED': {
          res.tracks.forEach((t) => {
            const content = isValidURL(args[0])
              ? `Плейлист добавлен в очередь: [${res.playlistInfo.name}](${args[0]})`
              : `${res.tracks.length} треков добавлено в очередь`
            const track = new DiscordTrack({
              track: t.track,
              info: t.info,
              requester: ctx.author,
            })
            dispatcher?.enqueue(track)
            ctx.sendMessage({
              content,
            })
          })
          break
        }
        case 'TRACK_LOADED':
        case 'SEARCH_RESULT': {
          const track = new DiscordTrack({
            track: res.tracks[0].track,
            info: res.tracks[0].info,
            requester: ctx.author,
          })
          dispatcher?.enqueue(track)
          ctx.sendMessage({
            content: `Трек добавлен в очередь: [${track.info.title}](${track.info.uri})`,
          })
          break
        }
      }

      await dispatcher?.tryPlay()
    } catch (error) {
      client.log.error(error)
      ctx.sendMessage('Произошла ошибка во время выполнения команды')
    }
  },
})
