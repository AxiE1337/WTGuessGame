import { memo } from 'react'

interface IDataStore {
  id: string
  guesses?: number
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
  const color = () => {
    if (newTank?.name) {
      return 'bg-lime-600'
    } else if (newTank?.guesses === 0) {
      return 'bg-red-700'
    } else {
      return ''
    }
  }
  const gameState = () => {
    if (newTank?.name) {
      return 'win'
    }
    if (newTank?.guesses === 0) {
      return 'loss'
    }
    return ''
  }

  return (
    <>
      <div
        className={`flex w-4/6 items-center justify-between mt-2 ${color()}`}
      >
        <p>#{index + 1}</p>
        <div className='flex w-40 h-12 items-center justify-between'>
          <h1>{gameState()}</h1>
          <p>
            {newTank?.guesses
              ? `Guesses remaining: ${newTank?.guesses}`
              : 'unplayed'}
          </p>
          {newTank?.name && (
            <h1>{newTank.name ? `Right answer ${newTank.name}` : 'loss'}</h1>
          )}
          {gameState() === '' && (
            <button className='btn' onClick={() => play(tank.id)}>
              play
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(TankComponent)
