import React from 'react';
import Letter from './Letter';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from './common/Modal';

interface HowToPlayProps {
  open: boolean;
  onClose: () => void;
}

const EXAMPLE_ONE = [
  { letter: 'W', style: 'bg-wl-green border-wl-green text-white' },
  { letter: 'E' },
  { letter: 'A' },
  { letter: 'R' },
  { letter: 'Y' },
];
const EXAMPLE_TWO = [
  { letter: 'P' },
  { letter: 'I', style: 'bg-wl-yellow border-wl-yellow text-white' },
  { letter: 'L' },
  { letter: 'L' },
  { letter: 'S' },
];
const EXAMPLE_THREE = [
  { letter: 'V' },
  { letter: 'A' },
  { letter: 'G' },
  { letter: 'U', style: 'bg-wl-gray border-wl-gray text-white' },
  { letter: 'E' },
];

const HowToPlay: React.FC<HowToPlayProps> = ({ open, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4">
        <XMarkIcon className="w-6 h-6" />
      </button>
      <div className="flex flex-col">
        <h1>How To Play</h1>
        <h2 className="mb-2">Guess the Wordle in 6 tries.</h2>

        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="mr-1 text-2xl">•</span>
            <span className="text-base">Each guess must be a valid 5-letter word.</span>
          </div>
          <div className="flex items-baseline">
            <span className="mr-1 text-2xl">•</span>
            <span className="text-base">
              The color of the tiles will change to show how close your guess was to the word.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-3 h-72">
          <p className="font-semibold">Example</p>
          <div className="mb-4">
            <div className="flex items-center mb-1">
              {EXAMPLE_ONE.map(({ letter, style }, index) => (
                <Letter key={index} letter={letter} tw={`mr-1 w-8 h-8 p-5 ${style}`} />
              ))}
            </div>
            <div>
              <span className="font-semibold">W</span> <span>is in the word and in the correct spot.</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-1">
              {EXAMPLE_TWO.map(({ letter, style }, index) => (
                <Letter key={index} letter={letter} tw={`mr-1 w-8 h-8 p-5 ${style}`} />
              ))}
            </div>
            <div>
              <span className="font-semibold">I</span> <span>is in the word but in the wrong spot.</span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-1">
              {EXAMPLE_THREE.map(({ letter, style }, index) => (
                <Letter key={index} letter={letter} tw={`mr-1 w-8 h-8 p-5 ${style}`} />
              ))}
            </div>
            <div>
              <span className="font-semibold">U</span> <span>is not in the word in any spot.</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HowToPlay;
