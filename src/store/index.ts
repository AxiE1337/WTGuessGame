import create from 'zustand'
import { persist } from 'zustand/middleware'

type Type = 'tank' | 'map'

interface IItem {
  id: string
  guesses: number
  name?: string
}

interface IData {
  tanks: IItem[]
  maps: IItem[]
  points: number
  addItem: (item: IItem, type: Type) => void
  updateItem: (item: IItem, type: Type) => void
  getPoints: () => void
  resetData: () => void
}

export const useStore = create<IData>()(
  persist(
    (set, get) => ({
      tanks: [],
      maps: [],
      points: 0,
      addItem: (item, type) => {
        if (type === 'tank') {
          set(({ tanks }) => ({ tanks: [...tanks, item] }))
        }
        if (type === 'map') {
          set(({ maps }) => ({ maps: [...maps, item] }))
        }
      },
      updateItem: (item, type) => {
        const { tanks, maps } = get()

        //updating values
        if (type === 'tank') {
          const index = tanks.findIndex((t) => t.id === item.id)
          const toUpdate = [...tanks]
          toUpdate[index] = item
          set(() => ({ tanks: toUpdate }))
        }
        if (type === 'map') {
          const index = maps.findIndex((m) => m.id === item.id)
          const toUpdate = [...maps]
          toUpdate[index] = item
          set(() => ({ maps: toUpdate }))
        }
      },
      getPoints: () => {
        const { tanks, maps } = get()
        const getPointsTanks = tanks
          .filter((t) => t.name)
          .reduce((prev: any, next) => {
            return prev + next.guesses
          }, 0)
        const getPointsMaps = maps
          .filter((m) => m.name)
          .reduce((prev: any, next) => {
            return prev + next.guesses
          }, 0)
        set(() => ({ points: getPointsTanks + getPointsMaps }))
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
