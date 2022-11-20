import jsonDataTanks from '../data/tanks.json'

interface ITanks {
  id: string
  guesses: number
  name?: string
}

export const isDataComromised = (tanks: ITanks[], points: number) => {
  for (let i of tanks) {
    if (i.guesses > jsonDataTanks[0].imgs.length || i.guesses < 0) {
      return true
    }
  }
  if (points < 0 || points > tanks.length * 3) {
    return true
  }
  return false
}
