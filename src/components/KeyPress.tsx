'use client';
import React from 'react';
import { KeyPressType } from './VirtualKeyboard';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface KeyPressProps {
  char: string;
  color?: string;
  onClickKey?: (key: string) => void;
}

const KeyPress: React.FC<KeyPressProps> = ({ char, color, onClickKey }) => {
  const [settings] = useLocalStorage<SettingType>('settings', { dailyMode: false, swapButton: false });

  let overrideStyle = '';

  switch (char) {
    case KeyPressType.ENTER:
      overrideStyle += `w-[43px] text-sm small-mobile:w-[53px] small-mobile:text-md mobile:w-[65px] mobile:text-lg ${
        settings.swapButton ? 'mr-0' : 'mr-1'
      }`;
      break;
    case KeyPressType.BACKSPACE:
      overrideStyle += `w-[43px] small-mobile:w-[53px] mobile:w-[65px] text-lg ${
        settings.swapButton ? 'mr-1' : 'mr-0'
      }`;
      break;
    case KeyPressType.L:
      overrideStyle += 'mr-0';
      break;
    case KeyPressType.P:
      overrideStyle += 'mr-0';
      break;
    default:
      overrideStyle += 'mr-1';
      break;
  }

  if (color) {
    overrideStyle += ` text-white bg-wl-${color}`;
  }

  return (
    <div
      className={`
        flex justify-center items-center 
        text-md small-mobile:text-lg font-semibold capitalize text-black 
        w-[27px] h-[35px] p-1 
        small-mobile:w-[33px] small-mobile:h-[45px] rounded-md bg-gray-300 cursor-pointer 
        mobile:w-[44px] mobile:h-[56px] mobile:p-2 mobile:text-xl 
        ${overrideStyle}
      `}
      onClick={() => onClickKey?.(char)}
    >
      {char}
    </div>
  );
};

export default KeyPress;
