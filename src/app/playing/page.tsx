'use client';
import React from 'react';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';
import HowToPlay from '@/components/HowToPlay';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  word: string;
  guesses: string[];
}

const WordleGame: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='w-[100%] flex flex-col justify-center items-center'>
      <div className=' w-[100%] border-x-gray-200 border-2 shadow flex justify-between items-center mb-4 p-3'>
        <div className='font-bold text-3xl'>Wordle</div>
        <div className='flex items-center'>
          <QuestionMarkCircleIcon onClick={() => setOpen(true)} className='w-8 h-8 cursor-pointer mr-5' />
          <Cog8ToothIcon className='w-8 h-8 cursor-pointer' />
        </div>
      </div>
      <div className='w-[500px] h-auto flex flex-col justify-center items-center'>
        <div className='h-96 mb-5 flex flex-col justify-between'>
          <Guess guess={[{ letter: 'A', className: 'bg-wl-green border-wl-green text-white' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
          <Guess guess={[{ letter: 'W' }, { letter: 'E' }, { letter: 'S', className: 'bg-wl-yellow border-wl-yellow text-white' }, { letter: 'T' }, { letter: 'E' }]} />
          <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
          <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
          <Guess guess={[{ letter: 'A' }, { letter: 'B', className: 'bg-wl-gray border-wl-gray text-white' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
          <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        </div>

        <div className='w-[100%]'>
          <VirtualKeyboard  />
        </div>

        <HowToPlay onClose={() => setOpen(false)} open={open} />
      </div>
    </div>
  );
};

export default WordleGame;
