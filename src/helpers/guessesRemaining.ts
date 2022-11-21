type Type = 'tank' | 'map'

interface IItem {
  id: string
  guesses: number
  name?: string
}
export const guessesRemaining = (
  tanks: IItem[],
  maps: IItem[],
  type: Type,
  id: string
) => {
  if (type === 'tank') {
    return tanks.find((t) => t.id === id)?.guesses as number
  } else if (type === 'map') {
    return maps.find((m) => m.id === id)?.guesses as number
  }
  return 0
}
