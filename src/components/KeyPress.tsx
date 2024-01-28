'use client';
import React from 'react';
import { KeyPressType } from './VirtualKeyboard';

interface KeyPressProps {
  char: string;
  color?: string;
  onClickKey?: (key: string) => void;
}

const KeyPress: React.FC<KeyPressProps> = ({ char, color, onClickKey }) => {
  let styles = 'w-11 h-14 p-2 rounded-md bg-gray-300 flex justify-center items-center text-xl font-semibold capitalize text-black cursor-pointer';
  if (char === KeyPressType.ENTER || char === KeyPressType.BACKSPACE) {
    styles += ' w-20 text-lg';
  }
  if (char === '') {
    styles += ' w-5 bg-transparent cursor-default pointer-events-none';
  }
  if (color && char !== KeyPressType.ENTER && char !== KeyPressType.BACKSPACE && char !== '') {
    styles += color === 'black' ? ` text-white bg-wl-gray`  : ` text-white bg-wl-${color}`;
  }
  return (
    <div className={styles} onClick={() => onClickKey?.(char)}>
      {char}
    </div>
  );
}

export default KeyPress;