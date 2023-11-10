import React from 'react';
import Letter, { LetterProps } from './Letter';

interface GuessProps {
  guess: LetterProps[];
}

const Guess: React.FC<GuessProps> = ({ guess }) => {
  return (
    <div className='w-80 flex items-center justify-between'>
      {guess.map((g, index) => (
        <Letter key={index} letter={g.letter} bg={g.bg} />
      ))}
    </div>
  );
};

export default Guess;
