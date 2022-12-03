import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { isDataComromised } from '../helpers/isDataCompromised'
import { useStore } from '../store/index'
import { useTheme } from '../store/themeMode'
import { useEffect, useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const { resetData, tanks, points, maps } = useStore((state) => state)
  const theme = useTheme((state) => state.mode)

  useEffect(() => {
    const html = document.querySelector('html') as HTMLElement
    html.setAttribute('data-theme', theme)

    if (theme === 'dark') {
      html.classList.remove('light')
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }
  }, [theme])

  useMemo(() => {
    if (isDataComromised(tanks, points, maps)) {
      resetData()
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
