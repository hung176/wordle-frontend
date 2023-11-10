import React from 'react';

export enum LetterColor {
  green = 'green',
  yellow = 'yellow',
  gray = 'gray',
}

export interface LetterProps {
  letter?: string;
  bg?: string;
}

const Letter: React.FC<LetterProps> = ({ letter, bg }: LetterProps) => {
  const textColor = bg ? 'text-white' : 'text-black';  
  let backgroundColor;
  let borderColor = letter ? 'border-gray-400' : 'border-gray-300';
  if (bg === LetterColor.green) {
    backgroundColor = 'bg-wl-green';
    borderColor = 'border-wl-green';
  } else if (bg === LetterColor.yellow) {
    backgroundColor = 'bg-wl-yellow';
    borderColor = 'border-wl-yellow';
  } else if (bg === LetterColor.gray) {
    backgroundColor = 'bg-wl-gray';
    borderColor = 'border-wl-gray';
  } else {
    backgroundColor = 'bg-white';
  }
  
  return (
    <div
      className={`w-8 h-8 p-7 flex items-center justify-center border-2 ${borderColor} ${backgroundColor} font-bold text-4xl`}
    >
      <span className={textColor}>{letter}</span>
    </div>
  );
};

export default Letter;