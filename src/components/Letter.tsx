import React, { HTMLAttributes } from 'react';

export type LetterProps = HTMLAttributes<HTMLDivElement> & {
  letter?: string;
}

const Letter: React.FC<LetterProps> = ({ letter, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={`flex items-center justify-center font-bold border-2 border-gray-300 text-3xl ${className} `}
    >
      {letter?.toUpperCase()}
    </div>
  );
};

export default Letter;