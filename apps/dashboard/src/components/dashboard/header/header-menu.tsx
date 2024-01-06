import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { UserService } from '@/services/user.service'
import { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSocket } from '@/components/providers/socket-provider'
import { User } from '@/types/bot-api'
import { useUser } from '@/hooks/use.user'

const navigation = [{ name: 'Выбрать сервер', href: `/dashboard` }]

const ProfileMenu = () => {
  const { isConnected } = useSocket()
  const { user, isLoading } = useUser()

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
      redirect: true,
    })
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-1">
        <div
          className={classNames(isLoading && 'animate-pulse', 'flex space-x-3')}
        >
          <div className="relative h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
            {!!user && (
              <img
                className="h-9 w-9 rounded-full"
                src={user.avatarURL}
                alt=""
              />
            )}
            <div
              className={classNames(
                'absolute bottom-0 right-0 h-3 w-3 rounded-full',
                isConnected ? 'bg-green-500' : 'bg-yellow-500'
              )}
            ></div>
          </div>
          <div className="flex items-center space-x-1">
            <span>
              {user ? (
                user.globalName
              ) : (
                <div className="w-20 h-5 bg-gray-700 rounded"></div>
              )}
            </span>
          </div>
        </div>
        <ChevronDownIcon className="h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 p-2 origin-top-right rounded-md bg-gray-950 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="" role="none">
            {navigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    href={item.href}
                    className={classNames(
                      active ? 'bg-gray-800 text-white' : 'text-gray-300',
                      'flex block px-4 py-2 text-bold rounded'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <div className="h-px bg-gray-700 my-2" />
            <Menu.Item>
              {({ active }) => (
                <div className="">
                  <button
                    onClick={() => {
                      handleSignOut()
                    }}
                    className={classNames(
                      active ? 'bg-gray-800 text-white' : 'text-gray-300',
                      'flex block w-full px-4 py-2 text-bold rounded'
                    )}
                  >
                    Выйти
                  </button>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileMenu
