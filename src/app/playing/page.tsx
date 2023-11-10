'use client';

import React from 'react';
import { LetterColor } from '@/components/Letter';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';

interface Props {
  word: string;
  guesses: string[];
}

const WordleGame: React.FC<Props> = () => {
  return (
    <div className='w-[500px] h-auto flex flex-col justify-center items-center'>
      <div className='h-96 mb-5 flex flex-col justify-between'>
        <Guess guess={[{ letter: 'A', bg: LetterColor.gray }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
        <Guess guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      </div>
      <div className='w-[100%]'>
        <VirtualKeyboard  />
      </div>
    </div>
  );
};

export default WordleGame;
