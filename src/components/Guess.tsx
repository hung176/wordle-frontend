import React from 'react';
import Letter from './Letter';
import { Attempt, LetterAnimationType } from '@/types';
import { usePrevious } from '@/hooks/usePrevious';

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
    <div className="flex items-center justify-between mb-2">
      {attempt.map(({ letter, position, green, yellow, gray }, idx) => {
        const shakingIndex = previousRow[idx].letter === '' && letter !== '';

        return (
          <Letter
            key={position}
            letter={letter}
            position={position}
            color={(green && 'green') || (yellow && 'yellow') || (gray && 'gray') || ''}
            animation={
              isRowFlipping
                ? LetterAnimationType.FLIP
                : isRowShaking
                ? LetterAnimationType.SHAKE
                : isRowTyping && shakingIndex
                ? LetterAnimationType.TYPING
                : LetterAnimationType.INITIAL
            }
            flipDelay={idx * 0.5}
            incrementIndex={incrementIndex}
          />
        );
      })}
    </div>
  );
};

export default Guess;
