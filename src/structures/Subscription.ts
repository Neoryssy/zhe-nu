import { Guild, TextBasedChannel, VoiceBasedChannel } from 'discord.js'
import DiscordMusicBot from './DiscordMusicBot'
import Dispatcher from './Dispather'

const isValidURL = (str: string) => {
  let url: URL
  try {
    url = new URL(str)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export default class Subscription extends Map {
  private _client: DiscordMusicBot

  constructor(client: DiscordMusicBot) {
    super()
    this._client = client
  }

  clear() {
    return super.clear()
  }
  delete(guildId: string): boolean {
    return super.delete(guildId)
  }
  get(guildId: string): Dispatcher {
    return super.get(guildId)
  }
  set(guildId: string, dispatcher: Dispatcher): this {
    return super.set(guildId, dispatcher)
  }

  async create(
    guild: Guild,
    channel: TextBasedChannel,
    voice: VoiceBasedChannel
  ) {
    let dispatcher = this.get(guild.id)
    if (!dispatcher) {
      const node = this._client.manager?.getNode()
      const player = await node!.joinChannel({
        channelId: voice.id,
        guildId: guild.id,
        shardId: 0,
      })

      dispatcher = new Dispatcher({
        client: this._client,
        guildId: guild.id,
        channelId: voice.id,
        player,
      })
      this.set(guild.id, dispatcher)
    }

    return dispatcher
  }

  async search(query: string) {
    const node = this._client.manager?.getNode()
    let response = null
    try {
      response = await node!.rest.resolve(
        isValidURL(query) ? query : `ytsearch:${query}`
      )
    } catch (e) {
      this._client.log.error(e)
    }
    return response
  }
}