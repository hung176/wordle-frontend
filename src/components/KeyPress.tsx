'use client';
import React from 'react';
import { KeyPressType } from './VirtualKeyboard';

interface KeyPressProps {
  char: string;
  onPress?: (key: string) => void;
}

const KeyPress: React.FC<KeyPressProps> = ({ char, onPress }) => {
  let styles = 'w-11 h-14 p-2 rounded-md bg-gray-300 flex justify-center items-center text-xl font-semibold capitalize text-black cursor-pointer';
  if (char === KeyPressType.ENTER || char === KeyPressType.BACKSPACE) {
    styles += ' w-20 text-lg';
  }
  if (char === '') {
    styles += ' w-5 bg-transparent cursor-default pointer-events-none';
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('e.key', e.key);
  }
  return (
    <div className={styles} onClick={() => onPress?.(char)} onKeyDown={handleKeyDown}>
      {char}
    </div>
  );
}

export default KeyPress;