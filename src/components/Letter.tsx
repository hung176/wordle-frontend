import React, { HTMLAttributes } from 'react';
import { LetterAnimationType, Letter as LetterType } from '@/types';
import { useAnimate } from 'framer-motion';

export type LetterProps = LetterType &
  HTMLAttributes<HTMLDivElement> & {
    animation?: LetterAnimationType;
    flipDelay?: number;
    incrementIndex?: () => Promise<void>;
  };

const Letter: React.FC<LetterProps> = ({ letter, position, tw, animation, flipDelay, incrementIndex }) => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (animation === LetterAnimationType.TYPING) {
      (async () => {
        await animate(scope.current, { scale: [1, 1.2, 1] }, { duration: 0.3 });
      })();
    } else if (animation === LetterAnimationType.FLIP) {
      (async () => {
        const color = tw?.includes('green') ? '#6aaa64' : tw?.includes('yellow') ? '#c9b458' : '#787c7e';
        await animate(
          scope.current,
          { rotateX: [0, 45, 90, 90, 45, 0], color: '#fff', borderColor: color, backgroundColor: color },
          { duration: 0.5, delay: flipDelay }
        );

        // animation end
        if (position === 4) {
          await incrementIndex?.();
        }
      })();
    } else if (animation === LetterAnimationType.SHAKE) {
      (async () => {
        await animate(scope.current, { x: [-5, 5, -5, 5, -5, 5, -5, 0] }, { duration: 0.5 });
      })();
    }
  }, [animation]);

  return (
    <div
      ref={scope}
      className={`flex items-center justify-center font-bold border border-gray-300 text-3xl
      ${animation === LetterAnimationType.FLIP ? 'w-14 h-14 p-7' : tw}
      `}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default Letter;
