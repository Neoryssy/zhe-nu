import { Player, Track, TrackEndReason } from 'shoukaku'
import DiscordMusicBot from './DiscordMusicBot'
import { Guild, TextBasedChannel, User, VoiceBasedChannel } from 'discord.js'
import EmbedBlueprint from './EmbedBlueprint'
export interface IDiscordTrack {
  track: string
  info: {
    identifier: string
    isSeekable: boolean
    author: string
    length: number
    isStream: boolean
    position: number
    title: string
    uri: string
    sourceName: string
  }
  requester: User
}

export class DiscordTrack implements Track {
  track: string
  info: {
    identifier: string
    isSeekable: boolean
    author: string
    length: number
    isStream: boolean
    position: number
    thumbnailURL: string
    title: string
    uri: string
    sourceName: string
  }
  requester: User

  constructor(options: IDiscordTrack) {
    const thumbnailURL = `https://img.youtube.com/vi/${options.info.identifier}/0.jpg`
    this.info = { ...options.info, thumbnailURL }
    this.requester = options.requester
    this.track = options.track
  }
}

export interface IDispatcherOptions {
  client: DiscordMusicBot
  guildId: string
  voiceId: string
  channelId: string
  player: Player
}

export default class Dispatcher {
  private _client: DiscordMusicBot
  private _guildId: string
  private _channelId: string
  private _player: Player
  private _queue: DiscordTrack[]
  private _current: DiscordTrack | null

  constructor(options: IDispatcherOptions) {
    this._client = options.client
    this._guildId = options.guildId
    this._channelId = options.channelId
    this._player = options.player
    this._queue = []
    this._current = null

    this._player.on('closed', (reason) => {
      console.log(reason)
    })
    this._player.on('end', async (event) => {
      this._current = null
      if (event.reason === 'FINISHED') {
        await this.tryPlay()
      }
    })
    this._player.on('start', (event) => {
      if (!this._current) return
      const channel = this._client.channels.cache.get(
        this._channelId
      ) as TextBasedChannel
      const embed = new EmbedBlueprint(this._client).nowPlaying(this._current)
      channel.send({ embeds: [embed] })
    })
  }

  get client() {
    return this._client
  }
  get current() {
    return this._current
  }
  get guildId() {
    return this._guildId
  }
  get channelId() {
    return this._channelId
  }
  get voiceId() {
    return this._player.connection.channelId
  }
  get paused() {
    return this._player.paused
  }
  get player() {
    return this._player
  }
  get queue() {
    return this._queue
  }

  destroy() {
    this._player.connection.disconnect()
    this._queue = []
    this._client.subsription.delete(this._guildId)
  }

  enqueue(track: DiscordTrack) {
    this._queue.push(track)
  }

  async join(voice: VoiceBasedChannel) {
    try {
      await this._player.connection.connect({
        channelId: voice.id,
        guildId: this._guildId,
        shardId: 0,
      })
    } catch (error) {
      this._client.log.error(error)
    }
  }

  pause() {
    if (!this._current) return
    if (this.paused) return

    return this._player.setPaused(true)
  }

  skip() {
    if (!this._current) return
    const position = this._current.info.length
    this._player.seekTo(position)
  }

  stop() {
    this._player.stopTrack()
  }

  async tryPlay() {
    if (!this.voiceId) return
    if (!this._queue.length) {
      this._current = null
      return
    }
    if (this._current) return

    const track = this._queue.shift() as DiscordTrack
    await this._player.playTrack(track)
    this._current = track
  }

  unpause() {
    if (!this._current) return
    if (!this.paused) return

    return this._player.setPaused(false)
  }
}
