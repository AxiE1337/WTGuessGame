import React, { memo, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'
import Modal from './ui/Modal'

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
  const [hover, setHover] = useState<boolean>(false)
  const [stats, setStats] = useState<IStats>(statsInitialState)
  const { tanks, maps, points: storePoints } = useStore((state) => state)
  const router = useRouter()

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
  }, [])

  return (
    <div className='navbar bg-sky-900'>
      <div className='flex-1 text-white'>
        <div
          className='dropdown dropdown-hover'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <label className='ml-2 swap swap-rotate text-xl text-center'>
            <input type='checkbox' disabled />
            <div className={`swap-${hover ? 'off' : 'on'}`}>Menu</div>
            <div className={`swap-${hover ? 'on' : 'off'}`}>↓</div>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-1 shadow bg-sky-900 w-52'
          >
            <li onClick={() => router.push('/guessthetank')}>
              <a>Guess the tank</a>
            </li>
            <li onClick={() => router.push('/guessthemap')}>
              <a>Guess the map</a>
            </li>
          </ul>
        </div>
      </div>
      <label htmlFor='my-modal-4' className='btn btn-xs mx-4'>
        stats
      </label>
      <Modal>
        <div className='flex flex-col gap-4'>
          <h1>{`Points ${stats.points}`}</h1>
          <h1>{'Guessed right ' + stats.guessedRight}</h1>
          <h1>{`Tanks guessed right ${stats.guessedTanks}`}</h1>
          <h1>{`Maps guessed right ${stats.guessedMaps}`}</h1>
          <h1>{`Played ${stats.played}`}</h1>
          <h1>{`Losses ${stats.losses}`}</h1>
        </div>
      </Modal>
    </div>
  )
}

export default memo(NavBar)
