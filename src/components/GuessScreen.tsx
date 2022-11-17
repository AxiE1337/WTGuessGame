import React, { memo, useState } from 'react'
import Image from 'next/image'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'
import Input from './ui/Input'
import tanksAutocomplete from '../data/tanks.json'

interface IItem {
  item: { id: string; name: string; imgs: string[] }
}

function GuessScreen({ item }: IItem) {
  const [imgIndex, setImgIndex] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')
  const { updateTank, tanks } = useStore((state) => state)
  const tankGuesses = tanks.find((t) => t.id === item.id)?.guesses as number
  const [guesses, setGuesses] = useState<number>(tankGuesses)
  const router = useRouter()

  const skipHandler = () => {
    if (imgIndex < item.imgs.length - 1) {
      setImgIndex((prev) => prev + 1)
      setGuesses((prev) => prev - 1)
      updateTank({ id: item.id, guesses: guesses - 1 })
    }
    if (guesses - 1 < 1) {
      updateTank({
        id: item.id,
        guesses: guesses - 1,
      })
      router.reload()
    }
  }

  const submitHandler = () => {
    const isWin = item.name === inputValue
    if (!isWin) {
      skipHandler()
    } else {
      updateTank({
        id: item.id,
        guesses: guesses,
        name: inputValue,
      })
      router.reload()
    }
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='w-60 h-60 bg-slate-500'>
        <Image
          alt={item.id}
          src={item.imgs[imgIndex]}
          width={600}
          height={1200}
        />
      </div>
      <div>
        <Input
          value={inputValue}
          onChange={setInputValue}
          autocomplete={tanksAutocomplete.map((item) => item.name)}
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
