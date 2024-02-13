import React from 'react';
import Letter from './Letter';
import { Attempt } from '@/types';
import { generateClassName } from '@/utils';

interface GuessProps {
  attempt: Attempt;
}

const Guess: React.FC<GuessProps> = ({ attempt }) => {
  const attemptClassName = generateClassName(attempt);
  return (
    <div className="w-80 flex items-center justify-between">
      {attemptClassName.map(({ letter, className, position }) => (
        <Letter key={position} letter={letter} className={`w-14 h-14 p-7 ${className}`} />
      ))}
    </div>
  );
};

export default Guess;
