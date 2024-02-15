import { Attempt } from '@/types';

export function generateClassName(attempt: Attempt = []) {
  const greenClass = 'bg-wl-green border-wl-green text-white';
  const yellowClass = 'bg-wl-yellow border-wl-yellow text-white';
  const grayClass = 'bg-wl-gray border-wl-gray text-white';

  return attempt.map(({ letter, position, green, yellow, gray }) => ({
    letter,
    position,
    className: green ? greenClass : yellow ? yellowClass : gray ? grayClass : letter ? 'border-wl-gray' : '',
    styles: {
      backgroundColor: green ? '#6aaa64' : yellow ? '#c9b458' : gray ? '#787c7e' : '',
      borderColor: green ? '#6aaa64' : yellow ? '#c9b458' : gray ? '#787c7e' : letter ? '#787c7e' : '',
      color: green || yellow || gray ? 'white' : '',
    },
  }));
}
