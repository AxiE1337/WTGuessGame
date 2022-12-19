import React, { memo, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import { useTheme } from '../store/themeMode'
import { useRouter } from 'next/router'
import arrowLeft from '../components/ui/arrowLeft'
import Modal from './ui/Modal'
import SwapBtn from './ui/SwapBtn'

interface IStats {
  guessedRight: number
  guessedTanks: number
  guessedMaps: number
  points: number
  played: number
  losses: number
}
const statsInitialState: IStats = {
  guessedRight: 0,
  guessedTanks: 0,
  guessedMaps: 0,
  points: 0,
  played: 0,
  losses: 0,
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [stats, setStats] = useState<IStats>(statsInitialState)
  const { tanks, maps, points: storePoints } = useStore((state) => state)
  const { mode: themeMode, changeMode } = useTheme((state) => state)
  const router = useRouter()

  const changeThemeMode = (value: string) => {
    changeMode(value === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setStats({
      guessedRight:
        tanks.filter((t) => t.name).length + maps.filter((m) => m.name).length,
      guessedTanks: tanks.filter((t) => t.name).length,
      guessedMaps: maps.filter((m) => m.name).length,
      points: storePoints,
      played: tanks.length + maps.length,
      losses:
        tanks.filter((t) => t.guesses === 0).length +
        maps.filter((m) => m.guesses === 0).length,
    })
  }, [tanks, maps])

  const handleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const menuContent = (
    <div
      className='menu bg-gray-700 dark:bg-sky-900 rounded w-fit ml-4 md:text-xs'
      onClick={handleMenu}
    >
      <li onClick={() => router.push('/guessthetank')}>
        <a className='p-2 md:p-1'>Guess the tank</a>
      </li>
      <li onClick={() => router.push('/guessthemap')}>
        <a className='p-2 md:p-1'>Guess the map</a>
      </li>
      <li onClick={() => router.push('/')}>
        <a className='p-2 md:p-1'>Main</a>
      </li>
    </div>
  )

  return (
    <div className='navbar dark:bg-sky-900 dark:border-gray-700 border-b-2 fixed md:relative'>
      {router.pathname !== '/' && (
        <div
          className='w-10 h-10 cursor-pointer'
          onClick={() => router.push('/')}
        >
          {arrowLeft}
        </div>
      )}
      <div className='flex-1 text-white'>{menuOpen && menuContent}</div>
      <Modal>
        <div className='flex flex-col gap-4 px-5 py-3'>
          <h1>{`Points ${stats.points}`}</h1>
          <h1>{'Guessed right ' + stats.guessedRight}</h1>
          <h1>{`Tanks guessed right ${stats.guessedTanks}`}</h1>
          <h1>{`Maps guessed right ${stats.guessedMaps}`}</h1>
          <h1>{`Played ${stats.played}`}</h1>
          <h1>{`Losses ${stats.losses}`}</h1>
        </div>
      </Modal>
      <SwapBtn
        onChange={(e) => {
          changeThemeMode(e.target.value)
        }}
        value={themeMode}
        checked={themeMode === 'dark' ? false : true}
      />
    </div>
  )
}

export default memo(NavBar)
