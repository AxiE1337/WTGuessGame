import create from 'zustand'
import { persist } from 'zustand/middleware'

interface ITanks {
  id: string
  guesses?: number
  name?: string
}

interface IData {
  tanks: ITanks[]
  maps: string[]
  addTank: (tank: ITanks) => void
  updateTank: (tank: ITanks) => void
}

export const useStore = create<IData>()(
  persist(
    (set, get) => ({
      tanks: [],
      maps: [],
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
    }),
    {
      name: 'data-store',
    }
  )
)
