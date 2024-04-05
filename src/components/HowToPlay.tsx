import React from 'react';
import Letter from './Letter';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from './common/Modal';
import { motion } from 'framer-motion';

interface HowToPlayProps {
  onClose: () => void;
}

const EXAMPLE_ONE = ['W', 'E', 'A', 'R', 'Y'];
const EXAMPLE_TWO = ['P', 'I', 'L', 'L', 'S'];
const EXAMPLE_THREE = ['V', 'A', 'G', 'U', 'E'];

const animateProps = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0, transition: { duration: 0.5 } },
};

const HowToPlay: React.FC<HowToPlayProps> = ({ onClose }) => {
  return (
    <Modal isOpen onClose={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4">
        <XMarkIcon className="w-6 h-6" />
      </button>
      <div className="flex flex-col p-8">
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
              {EXAMPLE_ONE.map((letter, index) => (
                <motion.div
                  key={`${letter}${index}`}
                  className={`flex items-center justify-center font-bold  text-3xl w-8 h-8 p-5 mr-1 ${
                    index === 0 ? 'bg-wl-green border border-wl-green text-white' : 'border border-gray-300'
                  } `}
                  {...(index === 0 ? animateProps : {})}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            <div>
              <span className="font-semibold">W</span> <span>is in the word and in the correct spot.</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-1">
              {EXAMPLE_TWO.map((letter, index) => (
                <motion.div
                  key={`${letter}${index}`}
                  className={`flex items-center justify-center font-bold  text-3xl w-8 h-8 p-5 mr-1 ${
                    index === 1 ? 'bg-wl-yellow border border-wl-yellow text-white' : 'border border-gray-300'
                  } `}
                  {...(index === 1 ? animateProps : {})}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            <div>
              <span className="font-semibold">I</span> <span>is in the word but in the wrong spot.</span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-1">
              {EXAMPLE_THREE.map((letter, index) => (
                <motion.div
                  key={`${letter}${index}`}
                  className={`flex items-center justify-center font-bold  text-3xl w-8 h-8 p-5 mr-1 ${
                    index === 3 ? 'bg-wl-gray border border-wl-grayn text-white' : 'border border-gray-300'
                  } `}
                  {...(index === 3 ? animateProps : {})}
                >
                  {letter}
                </motion.div>
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
