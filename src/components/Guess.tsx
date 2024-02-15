import React from 'react';
import Letter from './Letter';
import { Attempt } from '@/types';
import { generateClassName } from '@/utils';

interface GuessProps {
  attempt: Attempt;
  isFlipped?: boolean;
}

const Guess: React.FC<GuessProps> = ({ attempt, isFlipped }) => {
  const attemptClassName = generateClassName(attempt);

  return (
    <div className="w-80 flex items-center justify-between">
      {attemptClassName.map(({ letter, className, position, styles }, idx) => (
        <Letter
          key={position}
          letter={letter}
          isFlipped={isFlipped}
          delay={idx * 0.5}
          className={`w-14 h-14 p-7 ${className}`}
          styles={styles}
        />
      ))}
    </div>
  );
};

export default Guess;
