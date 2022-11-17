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
  const { tanks: tanksDataStore, addTank } = useStore((state) => state)

  const playHandler = (id: string) => {
    const tank = tanksDataJson.find((t) => t.id === id) as ITank
    const isHas = tanksDataStore.find((t) => t.id === id)
    if (!isHas) {
      addTank({ id: tank.id, guesses: tank.imgs.length })
    }
    setCurrent(tank)
  }

  useEffect(() => {
    setData(tanksDataStore)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <h1 className='h-screen fles items-center justify-center'>Loading...</h1>
    )
  }
  if (current.id) {
    return <GuessScreen item={current} />
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1>guessatank</h1>
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
