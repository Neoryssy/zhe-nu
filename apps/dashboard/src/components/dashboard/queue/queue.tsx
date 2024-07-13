'use client'

import { useQueueSocket } from '@/hooks/use.queue.socket'
import msToMMSS from '@/utils/msToMMSS'
import {
  ArrowSmallDownIcon,
  ArrowSmallUpIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'

type QueueItemProps = {
  guildId: string
}

const Queue = ({ guildId }: QueueItemProps) => {
  const { queue, clearQueue, moveTrack, removeTrack } = useQueueSocket({ guildId })

  const renderQueue = () =>
    queue.map((item, idx) => (
      <div key={idx} className="flex bg-gray-700 space-x-2 p-3 rounded-lg">
        <Link className="relative" href="#">
          <img
            className="h-full w-36 object-cover rounded"
            src={`https://img.youtube.com/vi/${item.info.identifier}/mqdefault.jpg`}
            alt=""
          />
          <div className="absolute bottom-1 right-1 p-1 bg-gray-950/[.8] text-white text-sm leading-3 rounded">
            <span>{msToMMSS(item.info.length)}</span>
          </div>
        </Link>
        <div className="flex-1 flex justify-between">
          <div className="flex flex-col space-y-2">
            <h4 className="line-clamp-2 font-bold">{item.info.title}</h4>
            <span className="text-sm text-gray-300">
              Заказал: {item.requester.displayName}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <button
                onClick={() => {
                  removeTrack(idx)
                }}
                className="disabled:cursor-not-allowed "
              >
                <XMarkIcon className="h-6" />
              </button>
            </div>

            <div className="flex flex-col">
              <button
                onClick={() => {
                  moveTrack(idx, idx - 1)
                }}
                className="disabled:cursor-not-allowed "
              >
                <ArrowSmallUpIcon className="h-6" />
              </button>

              <button
                onClick={() => moveTrack(idx, idx + 1)}
                className="disabled:cursor-not-allowed "
              >
                <ArrowSmallDownIcon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))

  return (
    <div className="flex flex-col space-y-5 p-3">
      <div className="flex justify-between items-center">
        <div className="basis-1/4"></div>
        <div className="basis-2/4">
          <h2 className="text-center font-bold text-xl">Очередь</h2>
        </div>
        <div className="basis-1/4 flex justify-end">
          <button
            onClick={() => {
              clearQueue()
            }}
            className="basis-1/4 whitespace-nowrap text-red-500"
          >
            Очистить очередь
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        {queue.length > 0 ? (
          renderQueue()
        ) : (
          <div className="flex justify-center">
            <span>
              Пока-что тут пусто. Добавь что-нибудь из меню справа -&gt;
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Queue
