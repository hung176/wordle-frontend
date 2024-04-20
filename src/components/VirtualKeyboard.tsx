import React from 'react';
import KeyPress from './KeyPress';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SettingType } from './Setting';

export enum KeyPressType {
  Q = 'q',
  W = 'w',
  E = 'e',
  R = 'r',
  T = 't',
  Y = 'y',
  U = 'u',
  I = 'i',
  O = 'o',
  P = 'p',
  A = 'a',
  S = 's',
  D = 'd',
  F = 'f',
  G = 'g',
  H = 'h',
  J = 'j',
  K = 'k',
  L = 'l',
  ENTER = 'enter',
  Z = 'z',
  X = 'x',
  C = 'c',
  V = 'v',
  B = 'b',
  N = 'n',
  M = 'm',
  BACKSPACE = '⌫',
}

export enum KeyBoardType {
  QUERY = 'query',
}

export const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
];

export const SWAPKEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⌫', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'],
];

type VirtualKeyboardProps = {
  keyColors: {
    [key: string]: string;
  };
  type?: KeyBoardType;
  onKeyChange?: (key: string) => void;
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ keyColors, type, onKeyChange }) => {
  const [settings] = useLocalStorage<SettingType>('settings', { dailyMode: false, swapButton: false });
  const keyBoard = settings.swapButton ? SWAPKEYS : KEYS;
  const handleClickKey = (key: string) => {
    onKeyChange?.(key);
  };

  return (
    <div className="px-2">
      {keyBoard.map((row) => {
        const rowKey = row.reduce((acc, curr) => acc + curr, '');
        return (
          <div key={rowKey} className="flex items-center justify-center mb-2">
            {row.map((char, idx) => (
              <KeyPress key={`${char}${idx}`} char={char} onClickKey={handleClickKey} color={keyColors[char]} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default VirtualKeyboard;
