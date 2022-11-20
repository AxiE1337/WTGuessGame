import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { isDataComromised } from '../helpers/isDataCompromised'
import { useStore } from '../store/index'
import { useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const { resetData, tanks, points, maps } = useStore((state) => state)

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
