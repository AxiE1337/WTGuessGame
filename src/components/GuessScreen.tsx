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
  const guessesRemaining = tanks.find((t) => t.id === item.id)
    ?.guesses as number
  const router = useRouter()

  const skipHandler = () => {
    if (imgIndex < item.imgs.length - 1) {
      setImgIndex((prev) => prev + 1)
      updateTank({ id: item.id, guesses: guessesRemaining - 1 })
    }
    if (guessesRemaining - 1 < 1) {
      updateTank({
        id: item.id,
        guesses: guessesRemaining - 1,
      })
      router.reload()
    }
  }

  const submitHandler = () => {
    const isWin = item.name === inputValue
    if (!isWin) {
      skipHandler()
      setInputValue('')
    } else {
      updateTank({
        id: item.id,
        guesses: guessesRemaining,
        name: inputValue,
      })
      router.reload()
    }
  }
  console.log(item.imgs.length - guessesRemaining)

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='bg-slate-500 rounded-xl m-4'>
        <Image
          className='rounded-xl'
          alt={item.id}
          src={item.imgs[imgIndex]}
          width={800}
          height={450}
        />
      </div>
      <div>
        {item.imgs.map((button, index) => (
          <input
            key={index}
            type='radio'
            name='radio-1'
            className='radio radio-accent'
            onClick={() => setImgIndex(index)}
            disabled={item.imgs.length - guessesRemaining < index}
          />
        ))}
      </div>
      <div>
        <Input
          value={inputValue}
          onChange={setInputValue}
          autocomplete={tanksAutocomplete.map((item) => item.name)}
        />
        <h1>Guesses remaining{guessesRemaining}</h1>
        <button className='btn' onClick={submitHandler}>
          Submit
        </button>
        <button className='btn' onClick={skipHandler}>
          Skip
        </button>
      </div>
    </div>
  )
}

export default memo(GuessScreen)
