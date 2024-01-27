import React from 'react';
import KeyPress from './KeyPress';

export enum KeyPressType {
  LETTER = 'letter',
  ENTER = 'enter',
  BACKSPACE = '⌫',
}

type VirtualKeyboardProps = {
  onKeyChange?: (key: string) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyChange }) => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ''],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']
  ];

  const handleKeyPress = (key: string) => {
    onKeyChange?.(key);
  }; 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {};

  return (
    <div>
      {keys.map((row) => {
        const rowKey = row.reduce((acc, curr) => acc + curr, '');
        return (
          <div key={rowKey} className='flex items-center justify-between mb-2'>
            {row.map((char, idx) => (
              <KeyPress key={`${char}${idx}`} char={char} onPress={handleKeyPress} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default VirtualKeyboard;