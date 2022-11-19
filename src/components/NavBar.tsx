import React, { memo, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'

interface IItem {
  id: string
  name: string
  guesses: number
  imgs: string[]
}

function NavBar() {
  const [winsTank, setWinsTank] = useState<IItem[]>([])
  const { tanks, points: storePoints, getPoints } = useStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    getPoints()
    setWinsTank(tanks.filter((t) => t.name) as IItem[])
  }, [])

  return (
    <div className='navbar bg-slate-700'>
      <div className='flex-1 text-white'>
        <div className='dropdown dropdown-hover'>
          <label tabIndex={0} className='btn btn-ghost m-1'>
            Go to
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-1 shadow bg-slate-700 w-52'
          >
            <li onClick={() => router.push('/guessthetank')}>
              <a>Guess the tank</a>
            </li>
            <li>
              <a>Guess the map</a>
            </li>
          </ul>
        </div>
      </div>
      {winsTank.length > 0 && (
        <div className='flex gap-4'>
          <h1 className='text-white'>{'Guessed right ' + winsTank.length}</h1>
          <h1 className='text-white'>{`Points ${storePoints}`}</h1>
        </div>
      )}
    </div>
  )
}

export default memo(NavBar)
