import { useEffect, useState } from 'react'
import { useStore } from '../store/index'
import tanksDataJson from '../data/tanks.json'
import ItemBar from '../components/ItemBar'
import GuessScreen from '../components/GuessScreen'

interface ITanks {
  id: string
  guesses?: number
  name?: string
}
interface ITank {
  id: string
  name: string
  imgs: string[]
}

export default function Guessatank() {
  const [loading, setLoading] = useState<boolean>(true)
  const [dataStore, setData] = useState<ITanks[]>([])
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

  useEffect(() => {
    setData(tanksDataStore)
    setLoading(false)
  }, [])

  if (loading) {
    return <progress className='progress w-56'></progress>
  }
  if (current.id) {
    return <GuessScreen item={current} type='tank' />
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center bg-gray-800'>
      {tanksDataJson.map((tank, index) => (
        <ItemBar
          item={tank}
          dataStore={dataStore}
          index={index}
          play={playHandler}
          key={tank.id}
        />
      ))}
    </div>
  )
}
