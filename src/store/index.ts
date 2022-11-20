import create from 'zustand'
import { persist } from 'zustand/middleware'

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

interface IData {
  tanks: ITanks[]
  maps: IMaps[]
  points: number
  addTank: (tank: ITanks) => void
  updateTank: (tank: ITanks) => void
  getPoints: () => void
  resetData: () => void
}

export const useStore = create<IData>()(
  persist(
    (set, get) => ({
      tanks: [],
      maps: [],
      points: 0,
      addTank: (tank) => {
        set(({ tanks }) => ({ tanks: [...tanks, tank] }))
      },
      updateTank: (tank) => {
        const state = get()
        const index = state.tanks.findIndex(
          (t) =>
            t.id.slice(0, t.id.length - 1) ===
            tank.id.slice(0, tank.id.length - 1)
        )
        //updating values
        const toUpdate = [...state.tanks]
        toUpdate[index] = tank
        set(() => ({ tanks: toUpdate }))
      },
      getPoints: () => {
        const { tanks, maps } = get()
        const getPointsTanks = tanks
          .filter((t) => t.name)
          .reduce((prev: any, next) => {
            return prev + next.guesses
          }, 0)
        set(() => ({ points: getPointsTanks }))
      },
      resetData: () => {
        set(() => ({ tanks: [], maps: [], points: 0 }))
      },
    }),
    {
      name: 'data-store',
    }
  )
)
