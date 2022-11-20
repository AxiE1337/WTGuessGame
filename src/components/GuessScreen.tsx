import React, { memo, useState } from 'react'
import Image from 'next/image'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Input from './ui/Input'
import tanksAutocomplete from '../data/tanks.json'
import Helper from './ui/Helper'

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 1,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 1,
    }
  },
}

interface IItem {
  item: { id: string; name: string; imgs: string[] }
}

function GuessScreen({ item }: IItem) {
  const [[imgIndex, direction], setImgIndex] = useState<number[]>([0, 0])
  const [inputValue, setInputValue] = useState<string>('')
  const { updateTank, tanks } = useStore((state) => state)
  const guessesRemaining = tanks.find((t) => t.id === item.id)
    ?.guesses as number
  const router = useRouter()

  const skipHandler = () => {
    if (imgIndex < item.imgs.length - 1) {
      setImgIndex([imgIndex + 1, 1])
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

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center bg-gray-800'>
      <AnimatePresence initial={false} custom={direction}>
        <div className='relative flex items-center justify-center h-2/4 w-4/5 overflow-hidden'>
          <motion.div
            key={item.imgs[imgIndex]}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 250, damping: 20 },
              opacity: { duration: 0.2 },
            }}
            className='absolute rounded-xl m-4 h-auto w-auto'
          >
            <Image
              className='rounded-xl'
              alt={item.id}
              src={item.imgs[imgIndex]}
              placeholder='blur'
              blurDataURL={item.imgs[imgIndex]}
              width={800}
              height={450}
            />
          </motion.div>
        </div>
      </AnimatePresence>
      <div className='z-10'>
        {item.imgs.map((button, index) => (
          <input
            key={index}
            type='radio'
            name='radio-1'
            className='radio radio-info ml-2'
            onClick={() => setImgIndex((prev) => [index, index - prev[0]])}
            disabled={item.imgs.length - guessesRemaining < index}
          />
        ))}
      </div>
      <div className='flex flex-col m-1 p-1 gap-2'>
        <div className='flex items-center justify-center gap-1'>
          <Helper hover>
            <p>Type your guess in input!</p>
          </Helper>
          <Input
            value={inputValue}
            onChange={setInputValue}
            autocomplete={tanksAutocomplete.map((item) => item.name)}
          />
        </div>
        <h1 className='text-center mb-2 text-white'>
          Guesses remaining: {guessesRemaining}
        </h1>
        <div className='flex items-center justify-evenly'>
          <button className='btn' onClick={submitHandler}>
            Submit
          </button>
          <button className='btn' onClick={skipHandler}>
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(GuessScreen)
