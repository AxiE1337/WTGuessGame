import create from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ITheme {
  mode: string
  changeMode: (payload: Theme) => void
}

export const useTheme = create<ITheme>()(
  persist(
    (set) => ({
      mode: 'dark',
      changeMode: (payload) => {
        set(({ mode }) => ({ mode: (mode = payload) }))
      },
    }),
    {
      name: 'data-theme',
    }
  )
)
