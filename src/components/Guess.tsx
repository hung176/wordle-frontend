import React from 'react';
import Letter from './Letter';
import { Attempt, LetterAnimationType, Letter as LetterType } from '@/types';

export enum ColorOptions {
  GREEN = 'wl-green',
  YELLOW = 'wl-yellow',
  GRAY = 'wl-gray',
}

interface GuessProps {
  attempt: Attempt;
  isRowFlipped?: boolean;
  incrementIndex: () => Promise<void>;
}

const Guess: React.FC<GuessProps> = ({ attempt, isRowFlipped, incrementIndex }) => {
  return (
    <div className="w-80 flex items-center justify-between">
      {attempt.map(({ letter, position, green, yellow, gray, animation }, idx) => {
        const tw = `bg-${
          green ? ColorOptions.GREEN : yellow ? ColorOptions.YELLOW : gray ? ColorOptions.GRAY : ''
        } border-${
          green ? ColorOptions.GREEN : yellow ? ColorOptions.YELLOW : gray || letter ? ColorOptions.GRAY : ''
        } text-${green || yellow || gray ? 'white' : ''} w-14 h-14 p-7`;

        return (
          <Letter
            key={position}
            letter={letter}
            position={position}
            tw={tw}
            animation={isRowFlipped ? LetterAnimationType.FLIP : animation}
            flipDelay={idx * 0.5}
            incrementIndex={incrementIndex}
          />
        );
      })}
    </div>
  );
};

export default Guess;
