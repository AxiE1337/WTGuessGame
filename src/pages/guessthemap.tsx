import React, { useEffect, useState } from 'react'
import GuessScreen from '../components/GuessScreen'
import ItemBar from '../components/ItemBar'
import mapsDataJson from '../data/maps.json'
import { useStore } from '../store/index'

interface IMaps {
  id: string
  guesses?: number
  name?: string
}
interface IMap {
  id: string
  name: string
  imgs: string[]
}

export default function guessthemap() {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataStore, setData] = useState<IMaps[]>([])
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

  useEffect(() => {
    setData(mapsDataStore)
    setLoading(false)
  }, [])

  if (loading) {
    return <progress className='progress w-56'></progress>
  }
  if (current.id) {
    return <GuessScreen item={current} type='map' />
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center bg-gray-800'>
      {mapsDataJson.map((map, index) => (
        <ItemBar
          item={map}
          dataStore={dataStore}
          index={index}
          play={playHandler}
          key={map.id}
        />
      ))}
    </div>
  )
}
