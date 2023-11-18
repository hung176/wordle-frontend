'use client';
import React from 'react';

interface KeyPressProps {
  char?: string;
}

const KeyPress: React.FC<KeyPressProps> = ({ char }) => {
  const handleEvent = (event: any) => {
    console.log(event);
  }
  let styles = 'w-11 h-14 p-2 rounded-md bg-gray-300 flex justify-center items-center text-xl font-semibold capitalize text-black cursor-pointer';
  if (char === 'enter' || char === '⌫') {
    styles += ' w-20 text-lg';
  }
  if (char === '') {
    styles += ' w-5 bg-transparent cursor-default';
  }
  return (
    <div className={styles}>
      {char}
    </div>
  );
}

export default KeyPress;