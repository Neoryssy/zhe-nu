import {
  ChannelType,
  EmbedBuilder,
  Message,
  Snowflake,
  TextBasedChannel,
} from 'discord.js'
import DiscordMusicBot from './DiscordMusicBot'
import { DiscordTrack } from './Dispatcher'

export default class EmbedBlueprint {
  private _client: DiscordMusicBot

  constructor(client: DiscordMusicBot) {
    this._client = client
  }

  enqueuePlaylist(playlistInfo: {
    title: string
    thumbnailURL: string
    url: string
  }) {
    const value = `[${playlistInfo.title}](${playlistInfo.url})`
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(playlistInfo.thumbnailURL)
      .addFields([{ name: 'Плейлист добвален в очередь', value }])

    return embed
  }

  enqueueTrack(track: DiscordTrack) {
    const value = `[${track.info.title}](${track.info.uri})`
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(track.info.thumbnailURL)
      .addFields([{ name: 'Трек добвален в очередь', value }])

    return embed
  }

  error(message: string) {
    const embed = new EmbedBuilder().setColor('Red').setDescription(message)
    return embed
  }

  message(message: string) {
    const embed = new EmbedBuilder().setColor('Blue').setDescription(message)
    return embed
  }

  nowPlaying(track: DiscordTrack) {
    const value = `[${track.info.title}](${track.info.uri})`
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(track.info.thumbnailURL)
      .addFields([{ name: 'Сейчас играет', value }])

    return embed
  }

  warn(message: string) {
    const embed = new EmbedBuilder().setColor('Yellow').setDescription(message)
    return embed
  }
}
