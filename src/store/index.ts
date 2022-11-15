import create from 'zustand'
import { persist } from 'zustand/middleware'

interface ITanks {
  id: string
  guesses: number
  name?: string
}

interface IData {
  tanks: ITanks[]
  maps: string[]
  addTank: (tank: ITanks) => void
}

export const useStore = create<IData>()(
  persist(
    (set) => ({
      tanks: [],
      maps: [],
      addTank: (tank) => set((state) => ({ tanks: [...state.tanks, tank] })),
    }),
    {
      name: 'data-store',
    }
  )
)
