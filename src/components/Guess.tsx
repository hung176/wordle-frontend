import React from 'react';
import Letter from './Letter';
import { Attempt, LetterAnimationType, Letter as LetterType } from '@/types';
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
            color={(green && 'green') || (yellow && 'yellow') || (gray && 'gray') || ''}
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
