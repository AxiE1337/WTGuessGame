import React, { memo, useState } from 'react'
import Image from 'next/image'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'

interface ITank {
  tank: { id: string; name: string; imgs: string[] }
}

function GuessScreen({ tank }: ITank) {
  const [imgIndex, setImgIndex] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const [guesses, setGuesses] = useState<number>(tank.imgs.length - 1)
  const addTank = useStore((state) => state.addTank)
  const router = useRouter()

  const skipHandler = () => {
    if (imgIndex < tank.imgs.length - 1) {
      setImgIndex((prev) => prev + 1)
      setGuesses((prev) => prev - 1)
      addTank({
        id: tank.id,
        guesses: guesses,
      })
    } else {
      addTank({
        id: tank.id.slice(0, tank.id.length - 1) + '0',
        guesses: guesses,
      })
      router.reload()
    }
  }

  const submitHandler = () => {
    const isWin = tank.name === inputValue
    if (!isWin) {
      skipHandler()
    } else {
      addTank({
        id: tank.id.slice(0, tank.id.length - 1) + '1',
        guesses: guesses,
        name: tank.name,
      })
      router.reload()
    }
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='w-60 h-60 bg-slate-500'>
        <Image
          alt={tank.id}
          src={tank.imgs[imgIndex]}
          width={600}
          height={1200}
        />
      </div>
      <div>
        <input
          type='text'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button className='btn' onClick={submitHandler}>
          Submit
        </button>
        <button className='btn' onClick={skipHandler}>
          Skip
        </button>
      </div>
      <h1>Guesses remaining{guesses}</h1>
    </div>
  )
}

export default memo(GuessScreen)
