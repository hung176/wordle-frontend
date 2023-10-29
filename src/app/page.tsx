import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div>
        <Image src="/wordle.webp" alt='wordle-logo' width={120} height={120} />
      </div>

      <div>
        <span className='font-semibold text-4xl'>Wordle</span>
      </div>

      <div>
        <span className='font-light text-3xl'>Get 6 chances to guess a 5-letter word.</span>
      </div>

      <div>
        <button>How to play</button>
        <button>Play</button>
      </div>

    </main>
  )
}
