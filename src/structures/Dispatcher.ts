import { Player, Track } from 'shoukaku'
import DiscordMusicBot from './DiscordMusicBot'
import { Guild, TextBasedChannel, User, VoiceBasedChannel } from 'discord.js'
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
    title: string
    uri: string
    sourceName: string
  }
  requester: User

  constructor(options: IDiscordTrack) {
    this.track = options.track
    this.info = options.info
    this.requester = options.requester
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

    this._player.on('end', async () => {
      await this.tryPlay()
    })
    this._player.on('closed', (reason) => {
      console.log(reason)
    })
    // this._player.on('update', (data) => {
    //   console.log(data)
    // })
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

  async tryPlay() {
    const track = this._queue.shift()

    if (!this.voiceId) return
    if (!track) {
      this._current = null
      return
    }
    if (this._current) return

    await this._player.playTrack(track)
    this._current = track
  }

  unpause() {
    if (!this._current) return
    if (!this.paused) return

    return this._player.setPaused(false)
  }
}
