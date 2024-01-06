import { DiscordTrack } from "./bot-api"

export type Player = {
  duration: number
  isLooping: boolean
  isMuted: boolean
  isPlaying: boolean
  isShuffled: boolean
  position: number
  track: DiscordTrack | null
}
