import React, { HTMLAttributes } from 'react';

export type LetterProps = HTMLAttributes<HTMLDivElement> & {
  letter?: string;
}

const Letter: React.FC<LetterProps> = ({ letter, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={`flex items-center justify-center w-8 h-8 font-bold text-2xl ${className} `}
    >
      {letter}
    </div>
  );
};

export default Letter;