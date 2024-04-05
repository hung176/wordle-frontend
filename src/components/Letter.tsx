import React, { HTMLAttributes } from 'react';
import { LetterAnimationType, Letter as LetterType } from '@/types';
import { useAnimate } from 'framer-motion';

export const ColorOptions = {
  green: 'wl-green',
  yellow: 'wl-yellow',
  gray: 'wl-gray',
};

type ColorOptionKeys = keyof typeof ColorOptions;

export type LetterProps = LetterType &
  HTMLAttributes<HTMLDivElement> & {
    color: ColorOptionKeys | '';
    animation?: LetterAnimationType;
    flipDelay?: number;
    incrementIndex?: () => Promise<void>;
  };

const Letter: React.FC<LetterProps> = ({ letter, position, color, animation, flipDelay, incrementIndex }) => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (animation === LetterAnimationType.TYPING) {
      (async () => {
        await animate(scope.current, { scale: [1, 1.2, 1] }, { duration: 0.3 });
      })();
    } else if (animation === LetterAnimationType.FLIP) {
      (async () => {
        const animateColor = color === 'green' ? '#6aaa64' : color === 'yellow' ? '#c9b458' : '#787c7e';
        await animate(
          scope.current,
          { rotateX: [0, 45, 90, 90, 45, 0], color: '#fff', borderColor: animateColor, backgroundColor: animateColor },
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

    return () => {
      scope.current?.removeAttribute('style');
    };
  }, [animation, letter]);

  return (
    <div
      ref={scope}
      className={`w-[50px] h-[50px] p-6 flex items-center justify-center font-bold border border-gray-300 text-3xl
      ${
        color && animation !== LetterAnimationType.FLIP
          ? `border-0 border-${ColorOptions[color]} text-white bg-${ColorOptions[color]}`
          : 'text-black bg-white'
      }
      ${position === 4 ? 'mr-0' : 'mr-2'}
      `}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default Letter;
