import React from 'react';
import Square, { SquareProps } from './Square';

interface RowProps {
  guess: SquareProps[];
}

const Row: React.FC<RowProps> = ({ guess }) => {
  return (
    <div className='w-80 flex items-center justify-between'>
      {guess.map((square, index) => (
        <Square key={index} letter={square.letter} bg={square.bg} />
      ))}
    </div>
  );
};

export default Row;
