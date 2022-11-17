import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <Head>
        <title>Guess War thunder</title>
        <meta name='description' content='Guess a tank/map War thunder' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <button className='btn' onClick={() => router.push('/guessatank')}>
        tanks
      </button>
    </div>
  )
}
