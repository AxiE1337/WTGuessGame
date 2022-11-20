import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <Head>
        <title>Guess War thunder</title>
      </Head>
      <button className='btn' onClick={() => router.push('/guessthetank')}>
        tanks
      </button>
    </div>
  )
}
