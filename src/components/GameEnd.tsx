import useSession from '@/hooks/useSession';
import React from 'react';
import Letter from './Letter';

const GameEnd: React.FC<{ wordToGuess: string }> = ({ wordToGuess = '' }) => {
  // const { startGame } = useSession();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-5">Wordle</div>
      <div className="text-2xl mb-5">
        <div className="mb-2">The session ended. The word was: </div>
        <div className="flex justify-center items-center">
          {wordToGuess.split('').map((letter, idx) => {
            return (
              <div key={`${letter}-${idx}`} className=" w-6 h-6 p-5 mr-1">
                <Letter letter={letter} className="bg-wl-green border-wl-green text-white" />
              </div>
            );
          })}
        </div>
      </div>
      <button
        // onClick={() => {
        //   startGame();
        // }}
        className="border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        New game
      </button>
    </div>
  );
};

export default GameEnd;
