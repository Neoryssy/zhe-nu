'use client'

import { GuildService } from '@/services/guild.service'
import { PartialGuild } from '@/types/guild'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

type GuildsListBoxProps = {
  guildId: string
}

const GuildsListBox = ({ guildId }: GuildsListBoxProps) => {
  const { getCurrentUserGuildsWithClient } = GuildService
  const router = useRouter()

  const [guilds, setGuilds] = useState<PartialGuild[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGuild, setSelectedGuild] = useState<PartialGuild | null>(null)

  const handleSelectGuild = (guild: PartialGuild) => {
    router.push(`/dashboard/${guild.id}`)
  }

  useEffect(() => {
    const fetchGuilds = async () => {
      const guilds = await getCurrentUserGuildsWithClient()
      const selectedGuild = guilds.find(
        (guild) => guild.id === guildId
      ) as PartialGuild

      setGuilds(guilds)
      setIsLoading(false)
      setSelectedGuild(selectedGuild)
    }

    fetchGuilds()
  }, [])

  useEffect(() => {
    const selectedGuild = guilds.find((guild) => guild.id === guildId)

    if (selectedGuild) {
      setSelectedGuild(selectedGuild)
    }
  }, [guildId])

  return (
    <Listbox
      value={selectedGuild}
      disabled={isLoading}
      onChange={handleSelectGuild}
    >
      <div className="relative">
        <Listbox.Button className="flex justify-between items-center w-full bg-gray-950 py-2 px-4 rounded-lg">
          <div className="flex justify-center space-x-2">
            {isLoading ? (
              <>
                <ArrowPathIcon className="animate-spin h-9 w-9" />
                <span className="flex items-center font-bold">Загрузка...</span>
              </>
            ) : (
              <>
                <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
                  {!!selectedGuild && (
                    <img
                      className="h-9 w-9 rounded-full"
                      src={`${process.env.NEXT_PUBLIC_DISCORD_CDN_ICONS}/${selectedGuild.id}/${selectedGuild.icon}.jpg`}
                      alt=""
                    />
                  )}
                </div>
                <span className="flex items-center font-bold">
                  {selectedGuild?.name}
                </span>
              </>
            )}
          </div>
          <ChevronDownIcon className="h-5 w-5" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-in duration-100"
          enterFrom="opacity-0 -translate-y-3"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 -translate-y-3"
        >
          <Listbox.Options className="absolute flex flex-col p-2 mt-1 max-h-90 w-full overflow-auto rounded-md bg-gray-950 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <div className="">
              {guilds.map((guild) => (
                <Listbox.Option
                  key={guild.id}
                  value={guild}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-gray-800 text-white' : 'text-gray-300',
                      'flex cursor-pointer justify-between items-center w-full rounded-lg'
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <div className="flex space-x-2 p-2 w-full">
                        <img
                          className="h-9 w-9 rounded-full"
                          src={`${process.env.NEXT_PUBLIC_DISCORD_CDN_ICONS}/${guild.id}/${guild.icon}.jpg`}
                          alt=""
                        />
                        <span className="flex items-center font-bold">
                          {guild.name}
                        </span>
                      </div>

                      {selected && (
                        <div className="pr-2">
                          <CheckIcon className="h-5 w-5" />
                        </div>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </div>

            <div className="h-px bg-gray-700 my-2"></div>

            <div className="">
              <Link
                href="/dashboard"
                className="flex w-full space-x-2 p-2 cursor-pointer rounded-lg hover:bg-gray-800 hover:text-white"
              >
                <PlusCircleIcon className="h-8 w-8" />
                <span className="flex items-center font-bold">
                  Добавить новый сервер
                </span>
              </Link>
            </div>
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default GuildsListBox
