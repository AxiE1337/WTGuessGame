import React, { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import Input from './ui/Input'
import Helper from './ui/Helper'
import { useStore } from '../store/index'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { autoCompleteData } from '../data/autocomplete'
import { guessesRemaining } from '../helpers/guessesRemaining'

const variants: Variants = {
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
const btnVariants: Variants = {
  animateLoss: {
    scale: 1.5,
    rotate: 5,
    color: 'rgb(255, 0, 0)',
    transition: {
      type: 'spring',
      duration: 0.5,
    },
  },
  animateWin: {
    scale: 1.5,
    rotate: 5,
    color: 'rgb(50,205,50)',
    transition: {
      type: 'spring',
      duration: 0.5,
    },
  },
}

type Type = 'tank' | 'map'

interface IItem {
  item: { id: string; name: string; imgs: string[] }
  current: (item: { id: string; name: string; imgs: string[] }) => void
  type: Type
}

function GuessScreen({ item, current, type }: IItem) {
  const [[imgIndex, direction], setImgIndex] = useState<number[]>([0, 0])
  const [inputValue, setInputValue] = useState<string>('')
  const { updateItem, tanks, maps, getPoints } = useStore((state) => state)
  const [subAnim, setSubAnim] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const guesses = useMemo(
    () => guessesRemaining(tanks, maps, type, item.id),
    [imgIndex]
  )

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
      setInputValue('')
      current({ id: '', name: '', imgs: [] })
    }
  }

  const submitHandler = async () => {
    const isWin = item.name === inputValue
    if (inputValue.length < 1) return
    if (!isWin) {
      setInputValue('')
      await submitAnimation('animateLoss')?.then(() => {
        skipHandler()
      })
    } else {
      setInputValue('')
      await submitAnimation('animateWin')?.then(() => {
        updateItem(
          {
            id: item.id,
            guesses: guesses,
            name: inputValue,
          },
          type
        )
        getPoints()
        current({ id: '', name: '', imgs: [] })
      })
    }
  }

  const submitAnimation = (value: string) => {
    if (isAnimating) return
    if (value === 'animateLoss') {
      setSubAnim(value)
    }
    if (value === 'animateWin') {
      setSubAnim(value)
    }
    return new Promise((resolve, reject) => {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
        resolve(setSubAnim(''))
      }, 600)
    })
  }

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center dark:bg-gray-800'>
      <AnimatePresence initial={false} custom={direction}>
        <div className='relative flex items-center justify-center h-2/4 w-4/5 overflow-hidden md:w-full'>
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
            onSubmit={submitHandler}
          />
        </div>
        <h1 className='text-center mb-2 dark:text-white'>
          Guesses remaining: {guesses}
        </h1>
        <div className='flex items-center justify-evenly'>
          <motion.button
            className='btn md:btn-sm'
            animate={subAnim}
            onClick={submitHandler}
            variants={btnVariants}
          >
            Submit
          </motion.button>
          <button className='btn md:btn-sm' onClick={skipHandler}>
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(GuessScreen)
