import { memo } from 'react'
import { Variants, motion } from 'framer-motion'

interface IDataStore {
  id: string
  guesses?: number
  name?: string
}

interface IItem {
  item: { id: string; name: string; imgs: string[] }
  dataStore: IDataStore[]
  play: (id: string) => void
  index: number
}

const itemVariants: Variants = {
  hidden: { x: -100, y: -100, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
  },
}
const itemVariantsMobile: Variants = {
  hidden: { x: 0, y: 0, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
  },
}

function ItemBar({ item, dataStore, play, index }: IItem) {
  const updatedItem = dataStore.find(
    (itemStore) =>
      itemStore.id.slice(0, itemStore.id.length - 1) ===
      item.id.slice(0, item.id.length - 1)
  )
  const color = () => {
    if (updatedItem?.name) {
      return 'text-lime-600'
    } else if (updatedItem?.guesses === 0) {
      return 'text-red-600'
    } else {
      return ''
    }
  }
  const gameState = () => {
    if (updatedItem?.name) {
      return 'win'
    }
    if (updatedItem?.guesses === 0) {
      return 'loss'
    }
    return ''
  }

  const autocompleteBar = () => {
    const guesses = updatedItem?.guesses || 0
    const number = item.imgs.length - guesses
    const array = new Array(number).fill('', 0, number)
    return array.map((i, index) => (
      <div key={index} className='bg-red-800 w-2 h-2'></div>
    ))
  }

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return (
    <motion.div
      variants={isMobile ? itemVariantsMobile : itemVariants}
      whileHover={{ scale: 1.1 }}
      className='flex w-4/6 h-16 rounded items-center justify-between mt-2 p-2 bg-slate-600 dark:bg-sky-900 md:w-11/12'
    >
      <p className='text-white md:text-sm'>#{index + 1}</p>
      <div className='flex items-center justify-between gap-4 pr-2 text-white md:text-xs md:p-0 md:gap-1 md:w-4/5'>
        <h1 className={`${color()} font-bold select-none`}>{gameState()}</h1>
        <h1 className='select-none'>
          {String(updatedItem?.guesses) === 'undefined' && 'unplayed'}
        </h1>
        <div className='flex gap-1'>
          {String(updatedItem?.guesses) !== 'undefined' && autocompleteBar()}
        </div>
        <p className='text-center'>
          {gameState() === 'win' && `Points: ${updatedItem?.guesses}`}
        </p>
        <p className='text-center'>
          {String(updatedItem?.guesses) !== 'undefined' &&
            `Guesses remaining: ${updatedItem?.guesses}`}
        </p>
        {updatedItem?.name && (
          <h1 className='text-center'>
            {updatedItem.name ? updatedItem.name.toLocaleUpperCase() : 'loss'}
          </h1>
        )}
        {gameState() === '' && (
          <button className='btn glass md:btn-sm' onClick={() => play(item.id)}>
            play
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default memo(ItemBar)
