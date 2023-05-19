import { Player } from 'shoukaku'
import DiscordMusicBot from './DiscordMusicBot'
import { VoiceBasedChannel } from 'discord.js'

export interface IDispatcherOptions {
  client: DiscordMusicBot
  guildId: string
  channelId: string
  player: Player
}

export default class Dispatcher {
  private _client: DiscordMusicBot
  private _guildId: string
  private _channelId: string
  private _voiceId: string | null
  private _player: Player
  private _queue: string[]

  constructor(options: IDispatcherOptions) {
    this._client = options.client
    this._guildId = options.guildId
    this._channelId = options.channelId
    this._voiceId = options.player.connection.channelId
    this._player = options.player
    this._queue = []
  }
}
