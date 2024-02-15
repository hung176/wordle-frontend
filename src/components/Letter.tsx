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
};

const Letter: React.FC<LetterProps> = ({ letter, className, styles, isFlipped = false, delay = 0 }) => {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (isFlipped) {
      const handleFlip = async () => {
        await animate(scope.current, { rotateX: [0, 90, 90, 0] }, { duration: 0.5, delay });
        scope.current.style.backgroundColor = styles?.backgroundColor;
        scope.current.style.borderColor = styles?.borderColor;
        scope.current.style.color = styles?.color;
      };
      handleFlip();
    }
  }, [isFlipped]);

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
