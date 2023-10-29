import React from 'react';
import Square, { SquareColor } from '@/components/Square';
import Row from '@/components/Row';

interface Props {
  word: string;
  guesses: string[];
}

const WordleGame: React.FC<Props> = () => {
  return (
    <div className='h-96 flex flex-col justify-between'>
      <Row guess={[{ letter: 'A', bg: SquareColor.gray }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      <Row guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      <Row guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      <Row guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      <Row guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
      <Row guess={[{ letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' }, { letter: 'E' }]} />
    </div>
  );
};

export default WordleGame;
