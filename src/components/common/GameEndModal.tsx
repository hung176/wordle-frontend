import React from 'react';
import Modal from './Modal';
import { LinkIcon } from '@heroicons/react/24/solid';

interface GameEndModalProps {
  isWin: boolean;
  word: string;
  open: boolean;
  onClose: () => void;
}

const GameEndModal: React.FC<GameEndModalProps> = ({ isWin, word = '', open, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose} closeOnOutsideClick={false}>
      <div className="w-[300px] h-[400px] flex flex-col justify-start items-center">
        <div
          className={`w-[100%] ${
            isWin ? 'bg-green-200' : 'bg-gray-200'
          } p-3 rounded-t-lg flex items-center justify-between`}
        >
          <div className="w-6" />
          <div className="text-xl font-semibold">{isWin ? 'You Won!' : 'You Lost!'}</div>
          <div className="text-center cursor-pointer text-gray-600 text-xl" onClick={onClose}>
            ✖
          </div>
        </div>
        <div className="h-[200px] p-3 flex flex-col justify-between items-center">
          <div>The answer was:</div>
          <div className="flex flex-col justify-start items-center">
            <div className="px-4 py-2 border-dashed border border-black bg-gray-200 text-2xl font-bold">
              {word.toUpperCase()}
            </div>
            <div className="mt-2 mb-2 text-sm">
              <a href={`https://wordfind.org/dictionary/bully`} target="_blank">
                What does this word mean?
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={() => {}}
              className="border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              New game
            </button>
          </div>
        </div>

        <a
          href="https://www.nytimes.com/2022/01/03/technology/wordle-word-game-creator.html"
          target="_blank"
          className="p-2 mt-3 flex items-center no-underline text-gray-600 text-sm cursor-pointer border rounded-md hover:bg-gray-100"
        >
          <LinkIcon className="w-4 h-4" />
          <span className="text-sm ml-2">Read the story about Wordle game</span>
        </a>
      </div>
    </Modal>
  );
};

export default GameEndModal;
