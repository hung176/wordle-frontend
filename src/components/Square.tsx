import React from 'react';

export enum SquareColor {
  green = 'green',
  yellow = 'yellow',
  gray = 'gray',
}

export interface SquareProps {
  letter?: string;
  bg?: string;
}

const Square: React.FC<SquareProps> = ({ letter, bg }: SquareProps) => {
  const textColor = bg ? 'text-white' : 'text-black';  
  let backgroundColor;
  let borderColor = letter ? 'border-gray-400' : 'border-gray-300';
  if (bg === SquareColor.green) {
    backgroundColor = 'bg-wl-green';
    borderColor = 'border-wl-green';
  } else if (bg === SquareColor.yellow) {
    backgroundColor = 'bg-wl-yellow';
    borderColor = 'border-wl-yellow';
  } else if (bg === SquareColor.gray) {
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

export default Square;