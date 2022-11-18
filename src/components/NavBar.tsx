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
  const [points, setPoints] = useState<number>(0)
  const { tanks, points: storePoints } = useStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    setWinsTank(tanks.filter((t) => t.name) as IItem[])
    setPoints(storePoints)
  }, [])

  return (
    <div className='navbar bg-slate-700'>
      <div className='flex-1'>
        <a
          className='btn btn-ghost normal-case text-xl text-white'
          onClick={() => router.push('/')}
        >
          Guess WT
        </a>
      </div>
      {winsTank.length > 0 && (
        <div className='flex gap-4'>
          <h1 className='text-white'>{'Guessed right ' + winsTank.length}</h1>
          <h1 className='text-white'>{`Points ${points}`}</h1>
        </div>
      )}
    </div>
  )
}

export default memo(NavBar)
