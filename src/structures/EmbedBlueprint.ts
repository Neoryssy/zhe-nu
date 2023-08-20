import {
  ChannelType,
  EmbedBuilder,
  Message,
  Snowflake,
  TextBasedChannel,
} from 'discord.js'
import DiscordMusicBot from './DiscordMusicBot'
import { DiscordTrack } from './Dispatcher'

type EnqueuePayload = {
  track: DiscordTrack
  type: 'track' | 'playlist'
}

export default class EmbedBlueprint {
  private _client: DiscordMusicBot

  constructor(client: DiscordMusicBot) {
    this._client = client
  }

  enqueue(payload: EnqueuePayload) {
    const name =
      payload.type === 'track'
        ? 'Трек добавлен в очередь'
        : 'Плейлист добавлен в очередь'
    const value = `[${payload.track.info.title}](${payload.track.info.uri})`
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(payload.track.info.thumbnailURL)
      .addFields([{ name, value }])

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
}
