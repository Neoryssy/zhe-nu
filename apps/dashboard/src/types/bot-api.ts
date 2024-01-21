export type ClientUser = {
  id: string
  displayName?: string
  avatar?: string
}

export type DiscordTrack = {
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
  requester: GuildMember
}

export type RESTPartialGuild = {
  bot: boolean
  bot_master: boolean
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
}

export type Guild = {
  id: string
  name: string
  icon: string | null
  iconURL: string | null
}

export type GuildMember = {
  id: string
  displayName: string
  user: User
}

export type GuildVoiceChannel = {
  id: string
  name: string
}

export type GuildVoiceState = {
  channel: GuildVoiceChannel | null
  guild: string
  id: string
  requestToSpeakTimestamp: number | null
  selfDeaf: boolean | null
  selfMute: boolean | null
  selfVideo: boolean | null
  serverDeaf: boolean | null
  serverMute: boolean | null
  sessionId: string | null
  streaming: boolean | null
  suppress: boolean | null
}

export type User = {
  id: string
  bot: boolean
  flags: number
  username: string
  globalName: string
  discriminator: string
  avatar: string | null
  avatarDecoration: string | null
  createdTimestamp: number
  tag: string
  avatarURL: string
  displayAvatarURL: string
}

export type QueueResponse = DiscordTrack | null
