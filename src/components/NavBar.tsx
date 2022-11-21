import React, { memo, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'

function NavBar() {
  const [hover, setHover] = useState<boolean>(false)
  const [guessedRight, setGuessedRight] = useState<number>(0)
  const {
    tanks,
    maps,
    points: storePoints,
    getPoints,
  } = useStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    getPoints()
    setGuessedRight(
      tanks.filter((t) => t.name).length + maps.filter((m) => m.name).length
    )
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
            <div className={`swap-${hover ? 'off' : 'on'}`}>Go to</div>
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
      {guessedRight > 0 && (
        <div className='flex gap-4'>
          <h1 className='text-white'>{'Guessed right ' + guessedRight}</h1>
          <h1 className='text-white'>{`Points ${storePoints}`}</h1>
        </div>
      )}
    </div>
  )
}

export default memo(NavBar)
