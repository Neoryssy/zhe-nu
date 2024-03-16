'use client'

import { usePlayerSocket } from '@/hooks/use.player.socket'
import msToMMSS from '@/utils/msToMMSS'
import { Tooltip } from 'flowbite-react'
import {
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/20/solid'
import { Shuffle } from '@mui/icons-material'
import { Slider } from '@mui/material'
import classNames from 'classnames'
import { useParams } from 'next/navigation'

type PlayerBarProps = {
  guildId: string
}

const PlayerBar = () => {
  const { guildId } = useParams() as { guildId: string }

  const { player, pause, resume, seek, skip } = usePlayerSocket({
    guildId,
  })
  const { duration, isLooping, isMuted, isPlaying, isShuffled, position } =
    player

  const formattedDuration = msToMMSS(duration)
  const formattedPosition = msToMMSS(position)
  const sliderPosition = Math.round((position / duration) * 100) || 0

  const seekHandler = (value: number) => {
    const position = Math.round((value / 100) * duration)
    seek(position)
  }

  return (
    <div className="bg-gray-900 border-t border-gray-700">
      <div className="flex justify-center space-x-4 py-3">
        <div className="flex flex-col justify-center">
          <div className="flex items-center w-[40rem] space-x-4">
            <span className="tabular-nums">{formattedPosition}</span>
            <Slider
              value={sliderPosition}
              min={0}
              max={100}
              onChange={(_, value) => seekHandler(value as number)}
            />
            <span className="tabular-nums">{formattedDuration}</span>
          </div>

          <div className="flex grid-cols-3 justify-between">
            <div className="flex">
              <button
                disabled={true}
                onClick={() => {}}
                className={classNames(
                  'disabled:cursor-not-allowed  hover:bg-gray-700 p-1 rounded',
                  isShuffled && 'text-blue-400'
                )}
              >
                <Shuffle className="h-5 w-5" />
              </button>

              <button
                disabled={true}
                onClick={() => {}}
                className={classNames(
                  'disabled:cursor-not-allowed hover:bg-gray-700 p-1 rounded',
                  isLooping && 'text-blue-400'
                )}
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex">
              <button
                disabled={true}
                className="disabled:cursor-not-allowed hover:bg-gray-700 p-1 rounded"
              >
                <BackwardIcon className="h-5 w-5" />
              </button>

              <button
                onClick={isPlaying ? pause : resume}
                className="hover:bg-gray-700 p-1 rounded"
              >
                {isPlaying ? (
                  <PauseIcon className="h-5 w-5" />
                ) : (
                  <PlayIcon className="h-5 w-5" />
                )}
              </button>

              <button className="hover:bg-gray-700 p-1 rounded">
                <ForwardIcon onClick={skip} className="h-5 w-5" />
              </button>
            </div>

            <div className="flex">
              <Tooltip arrow={false} content="Будет добавлено в будущем" placement='right' className='bg-gray-700'>
                <button
                  disabled={true}
                  onClick={() => {}}
                  className="disabled:text-slate-500 hover:bg-gray-700 p-1 rounded"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="h-5 w-5" />
                  ) : (
                    <SpeakerWaveIcon className="h-5 w-5" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBar
