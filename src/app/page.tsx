'use client'
import Image from 'next/image'
import React from 'react';
import { useRouter } from 'next/navigation'
import HowToPlay from '@/components/HowToPlay';

export default function Home() {
  const [openHowToPlay, setOpenHowToPlay] = React.useState(false);
  const router = useRouter();

  const toggleHowToPlay = () => {
    setOpenHowToPlay(!openHowToPlay);
  };
  const handleStartGame = () => {
    router.push('/playing');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-black">
      <main className='flex flex-col justify-center items-center'>
        <div>
          <Image src="/wordle.webp" alt='wordle-logo' width={120} height={120} />
        </div>

        <div className='mb-2'>
          <span className='font-semibold text-4xl'>Wordle</span>
        </div>

        <div className='flex flex-col justify-center items-center mb-6'>
          <span className='font-light text-3xl'>Get 6 chances to guess</span>
          <span className='font-light text-3xl'>the 5 letter word.</span>
        </div>

        <div>
          <button
            className='w-44 h-12 rounded-full border-2 border-gray-600 mr-4'
            onClick={toggleHowToPlay}
          >
            How to play
          </button>
          <button
            className='w-44 h-12 rounded-full text-white bg-black'
            onClick={handleStartGame}
          >
            Play
          </button>
        </div>

        <HowToPlay open={openHowToPlay} onClose={toggleHowToPlay} />
      </main>
    </div>
  )
}
