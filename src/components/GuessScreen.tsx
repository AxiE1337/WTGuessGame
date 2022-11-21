import React, { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import Input from './ui/Input'
import Helper from './ui/Helper'
import { useStore } from '../store/index'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { autoCompleteData } from '../data/autocomplete'
import { guessesRemaining } from '../helpers/guessesRemaining'

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

type Type = 'tank' | 'map'

interface IItem {
  item: { id: string; name: string; imgs: string[] }
  type: Type
}

function GuessScreen({ item, type }: IItem) {
  const [[imgIndex, direction], setImgIndex] = useState<number[]>([0, 0])
  const [inputValue, setInputValue] = useState<string>('')
  const { updateItem, tanks, maps } = useStore((state) => state)
  const guesses = useMemo(
    () => guessesRemaining(tanks, maps, type, item.id),
    [imgIndex]
  )
  const router = useRouter()

  const skipHandler = () => {
    if (imgIndex < item.imgs.length - 1) {
      setImgIndex([imgIndex + 1, 1])
      updateItem({ id: item.id, guesses: guesses - 1 }, type)
    }
    if (guesses - 1 < 1) {
      updateItem(
        {
          id: item.id,
          guesses: guesses - 1,
        },
        type
      )
      router.reload()
    }
  }

  const submitHandler = () => {
    const isWin = item.name === inputValue
    if (!isWin) {
      skipHandler()
      setInputValue('')
    } else {
      updateItem(
        {
          id: item.id,
          guesses: guesses,
          name: inputValue,
        },
        type
      )
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
            disabled={item.imgs.length - guesses < index}
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
            autocomplete={autoCompleteData}
          />
        </div>
        <h1 className='text-center mb-2 text-white'>
          Guesses remaining: {guesses}
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
