import React from 'react';
import KeyPress from './KeyPress';

type VirtualKeyboardProps = {
  onKeyPress?: (key: string) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress }) => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
  ];

  const handleClick = (key: string) => {
    onKeyPress?.(key);
  }

  return (
    <div>
      {keys.map((row, i) => (
        <div key={i} className='flex items-center justify-between mb-2'>
          {row.map(char => (
            <KeyPress key={char} char={char} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default VirtualKeyboard;