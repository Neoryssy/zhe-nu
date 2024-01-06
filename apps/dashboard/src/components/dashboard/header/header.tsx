'use client'

import Link from 'next/link'
import ProfileMenu from './header-menu'
import classNames from 'classnames'

type NavigationItem = {
  name: string
  href: string
  current: boolean
}

const navigation: NavigationItem[] = []

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 bg-gray-900 border-b border-gray-700">
      <div className="flex h-[65px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <nav className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <ProfileMenu />
      </div>
    </header>
  )
}

export default Header
