import { useCallback, useEffect, useState } from 'react'
import { useStore } from '../store/index'
import tanksDataJson from '../data/tanks.json'
import ItemBar from '../components/ItemBar'
import GuessScreen from '../components/GuessScreen'
import { getRandNum } from '../helpers/getRandNum'
import { Variants, motion } from 'framer-motion'

interface ITankStore {
  id: string
  guesses?: number
  name?: string
}
interface ITank {
  id: string
  name: string
  imgs: string[]
}

const divVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export default function Guessatank() {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataStore, setDataStore] = useState<ITankStore[]>([])
  const [current, setCurrent] = useState<ITank>({ id: '', name: '', imgs: [] })
  const { tanks: tanksDataStore, addItem } = useStore((state) => state)

  const playHandler = (id: string) => {
    const tank = tanksDataJson.find((t) => t.id === id) as ITank
    const isHas = tanksDataStore.find((t) => t.id === id)
    if (!isHas) {
      addItem({ id: tank.id, guesses: tank.imgs.length }, 'tank')
    }
    setCurrent(tank)
  }

  const playRandomHandler = useCallback(() => {
    const filteredArr: any[] = []
    for (let i of tanksDataJson) {
      const find = tanksDataStore.find((t) => t.id === i.id)
      if (!find) {
        filteredArr.push(i)
      }
    }
    const minValue = 0
    const maxValue = filteredArr.length - 1
    const randItem = filteredArr[getRandNum(minValue, maxValue)]
    if (randItem) {
      playHandler(randItem.id)
    }
  }, [])

  useEffect(() => {
    setDataStore(tanksDataStore)
    setLoading(false)
  }, [tanksDataStore])

  if (loading) {
    return <progress className='progress w-56'></progress>
  }
  if (current.id) {
    return <GuessScreen item={current} current={setCurrent} type='tank' />
  }

  return (
    <div className='flex flex-col min-h-screen items-center justify-center dark:bg-gray-800 pb-2'>
      <button className='btn mt-2 md:btn-xs' onClick={playRandomHandler}>
        Random
      </button>
      <motion.div
        variants={divVariants}
        initial='hidden'
        animate='visible'
        className='flex flex-col w-full items-center justify-center'
      >
        {tanksDataJson.map((tank, index) => (
          <ItemBar
            item={tank}
            dataStore={dataStore}
            index={index}
            play={playHandler}
            key={tank.id}
          />
        ))}
      </motion.div>
    </div>
  )
}
