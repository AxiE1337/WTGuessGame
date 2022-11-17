import { memo } from 'react'

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

function ItemBar({ item, dataStore, play, index }: IItem) {
  const updatedItem = dataStore.find(
    (itemStore) =>
      itemStore.id.slice(0, itemStore.id.length - 1) ===
      item.id.slice(0, item.id.length - 1)
  )
  const color = () => {
    if (updatedItem?.name) {
      return 'bg-lime-600'
    } else if (updatedItem?.guesses === 0) {
      return 'bg-red-700'
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

  return (
    <>
      <div
        className={`flex w-4/6 h-16 rounded items-center justify-between mt-2 ${color()}`}
      >
        <p>#{index + 1}</p>
        <div className='flex items-center justify-between gap-4 pr-2'>
          <h1>{!updatedItem?.guesses && 'unplayed'}</h1>
          <h1>{gameState()}</h1>
          <p>
            {updatedItem?.guesses &&
              `Guesses remaining: ${updatedItem?.guesses}`}
          </p>
          {updatedItem?.name && (
            <h1>
              {updatedItem.name ? `Right answer ${updatedItem.name}` : 'loss'}
            </h1>
          )}
          {gameState() === '' && (
            <button className='btn' onClick={() => play(item.id)}>
              play
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default memo(ItemBar)
