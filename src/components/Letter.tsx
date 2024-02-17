import React, { HTMLAttributes } from 'react';
import { useAnimate } from 'framer-motion';

export type LetterProps = HTMLAttributes<HTMLDivElement> & {
  letter?: string;
  styles?: {
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
  isFlipped?: boolean;
  delay?: number;
  isScale?: boolean;
};

const Letter: React.FC<LetterProps> = ({
  letter,
  className,
  styles,
  isFlipped = false,
  isScale = false,
  delay = 0,
}) => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (isFlipped) {
      const handleFlip = async () => {
        await animate(scope.current, { rotateX: [0, 45, 90, 90, 45, 0] }, { duration: 0.5, delay });
        scope.current.style.backgroundColor = styles?.backgroundColor;
        scope.current.style.borderColor = styles?.borderColor;
        scope.current.style.color = styles?.color;
      };
      handleFlip();
    }
    if (isScale) {
      (async () => {
        await animate(scope.current, { scale: [1, 1.2, 1] }, { duration: 0.3 });
      })();
    }
  }, [isFlipped, isScale]);

  return (
    <div
      ref={scope}
      className={`flex items-center justify-center font-bold border border-gray-300 text-3xl ${
        isFlipped ? 'w-14 h-14 p-7' : className
      }`}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default Letter;
