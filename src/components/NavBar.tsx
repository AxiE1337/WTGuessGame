import React, { memo, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'

function NavBar() {
  const [winsTank, setWinsTank] = useState<string[]>([])
  const store = useStore((state) => state)
  const router = useRouter()

  useEffect(() => {
    setWinsTank(store.tanks.filter((t) => t.name) as any[])
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
        <div className='flex-none'>
          <h1 className='text-white'>
            {'Guessed tanks right ' + winsTank.length}
          </h1>
        </div>
      )}
    </div>
  )
}

export default memo(NavBar)
