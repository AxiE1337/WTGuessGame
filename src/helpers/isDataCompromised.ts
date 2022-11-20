import jsonDataTanks from '../data/tanks.json'

interface ITanks {
  id: string
  guesses: number
  name?: string
}
interface IMaps {
  id: string
  guesses: number
  name?: string
}

export const isDataComromised = (
  tanks: ITanks[],
  points: number,
  maps: IMaps[]
) => {
  const maxGuesses: number = jsonDataTanks[0].imgs.length
  const maxPoints: number = tanks.length * 3 + maps.length * 3

  for (let i of tanks) {
    if (i.guesses > maxGuesses || i.guesses < 0) {
      return true
    }
  }
  for (let i of maps) {
    if (i.guesses > maxGuesses || i.guesses < 0) {
      return true
    }
  }
  if (points < 0 || points > maxPoints) {
    return true
  }
  return false
}
