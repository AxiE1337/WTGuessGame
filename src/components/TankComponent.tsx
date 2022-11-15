import { memo } from 'react'

interface IDataStore {
  id: string
  guesses: number
  name?: string
}

interface ITank {
  tank: { id: string }
  dataStore: IDataStore[]
  play: (id: string) => void
  index: number
}

function TankComponent({ tank, dataStore, play, index }: ITank) {
  const newTank = dataStore.find(
    (tankStore) =>
      tankStore.id.slice(0, tankStore.id.length - 1) ===
      tank.id.slice(0, tank.id.length - 1)
  )

  return (
    <>
      {!newTank ? (
        <div className='flex w-4/6 items-center justify-between mt-2'>
          <p>#{index + 1}</p>
          <div className='flex w-40 items-center justify-between'>
            <h1>unplayed</h1>
            <button className='btn' onClick={() => play(tank.id)}>
              play
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`flex w-4/6 items-center justify-between mt-2 ${
            newTank.name ? 'bg-lime-600' : 'bg-red-700'
          }`}
        >
          <p>#{index + 1}</p>
          <div className='flex w-40 items-center justify-between'>
            <h1>{newTank.name ? `Right answer ${newTank.name}` : 'loss'}</h1>
            <p>{newTank?.guesses}</p>
            <button className='btn'>play</button>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(TankComponent)
