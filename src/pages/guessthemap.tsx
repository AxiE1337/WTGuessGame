import React, { useCallback, useEffect, useState } from 'react'
import GuessScreen from '../components/GuessScreen'
import ItemBar from '../components/ItemBar'
import mapsDataJson from '../data/maps.json'
import { getRandNum } from '../helpers/getRandNum'
import { useStore } from '../store/index'
import { Variants, motion } from 'framer-motion'

interface IMapStore {
  id: string
  guesses?: number
  name?: string
}
interface IMap {
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

export default function guessthemap() {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataStore, setData] = useState<IMapStore[]>([])
  const [current, setCurrent] = useState<IMap>({ id: '', name: '', imgs: [] })
  const { maps: mapsDataStore, addItem } = useStore((state) => state)

  const playHandler = (id: string) => {
    const map = mapsDataJson.find((m) => m.id === id) as IMap
    const isHas = mapsDataStore.find((m) => m.id === id)
    if (!isHas) {
      addItem({ id: map.id, guesses: map.imgs.length }, 'map')
    }
    setCurrent(map)
  }

  const playRandomHandler = useCallback(() => {
    const filteredArr: IMap[] = []
    for (let i of mapsDataJson) {
      const find = mapsDataStore.find((t) => t.id === i.id)
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
    setData(mapsDataStore)
    setLoading(false)
  }, [mapsDataStore])

  if (loading) {
    return <progress className='progress w-56'></progress>
  }
  if (current.id) {
    return <GuessScreen item={current} current={setCurrent} type='map' />
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
        {mapsDataJson.map((map, index) => (
          <ItemBar
            item={map}
            dataStore={dataStore}
            index={index}
            play={playHandler}
            key={map.id}
          />
        ))}
      </motion.div>
    </div>
  )
}
