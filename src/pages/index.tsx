import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <div className='flex flex-col min-h-screen items-center justify-center dark:bg-gray-800'>
      <Head>
        <title>War thunder guess the tank game</title>
      </Head>
      <div className='h-screen w-full flex items-center justify-center md:flex-col'>
        <div
          onClick={() => router.push('/guessthetank')}
          className='w-2/5 h-3/6 relative flex items-center justify-center bg-black m-3 rounded-md select-none overflow-hidden md:w-5/6'
        >
          <Image
            alt='pt-76-57_1'
            src='https://i.postimg.cc/GmNwCHLx/pt-76-57-1.png'
            className='object-cover blur-sm scale-105 opacity-80 hover:blur-none hover:opacity-100 hover:scale-125 hover:z-20 ease-in-out duration-200'
            fill
            priority
            sizes='(max-width: 768px) 130vw, 80vw'
          />
          <h1 className='z-10 text-white'>Tanks</h1>
        </div>
        <div
          onClick={() => router.push('/guessthemap')}
          className='w-2/5 h-3/6 relative flex items-center justify-center bg-black m-3 rounded-md select-none overflow-hidden md:w-5/6'
        >
          <Image
            alt='abandonedtown_1'
            src='https://i.postimg.cc/L4cfcVt1/abandonedtown-1.png'
            className='object-cover blur-sm scale-105 opacity-80 hover:blur-none hover:opacity-100 hover:scale-125 hover:z-20 ease-in-out duration-200'
            fill
            priority
            sizes='(max-width: 768px) 130vw, 80vw'
          />
          <h1 className='z-10 text-white'>Maps</h1>
        </div>
      </div>
    </div>
  )
}
