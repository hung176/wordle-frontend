import React from 'react';
import Letter from './Letter';
import { Attempt, LetterAnimationType, Letter as LetterType } from '@/types';
import { usePrevious } from '@/hooks/usePrevious';

export enum ColorOptions {
  GREEN = 'wl-green',
  YELLOW = 'wl-yellow',
  GRAY = 'wl-gray',
}

interface GuessProps {
  attempt: Attempt;
  isRowFlipping?: boolean;
  isRowShaking?: boolean;
  isRowTyping?: boolean;
  incrementIndex: () => Promise<void>;
}

const Guess: React.FC<GuessProps> = ({ attempt, isRowFlipping, isRowShaking, isRowTyping, incrementIndex }) => {
  const previousRow = usePrevious(attempt);
  return (
    <div className="w-80 flex items-center justify-between">
      {attempt.map(({ letter, position, green, yellow, gray }, idx) => {
        const tw = `bg-${
          green ? ColorOptions.GREEN : yellow ? ColorOptions.YELLOW : gray ? ColorOptions.GRAY : ''
        } border-${
          green ? ColorOptions.GREEN : yellow ? ColorOptions.YELLOW : gray || letter ? ColorOptions.GRAY : ''
        } text-${green || yellow || gray ? 'white' : ''} w-14 h-14 p-7`;

        const shakingIndex = previousRow[idx].letter === '' && letter !== '';

        let animationType: LetterAnimationType;
        if (isRowTyping && shakingIndex) {
          animationType = LetterAnimationType.TYPING;
        } else if (isRowFlipping) {
          animationType = LetterAnimationType.FLIP;
        } else if (isRowShaking) {
          animationType = LetterAnimationType.SHAKE;
        } else {
          animationType = LetterAnimationType.INITIAL;
        }

        return (
          <Letter
            key={position}
            letter={letter}
            position={position}
            tw={tw}
            animation={animationType}
            flipDelay={idx * 0.5}
            incrementIndex={incrementIndex}
          />
        );
      })}
    </div>
  );
};

export default Guess;
