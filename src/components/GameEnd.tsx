import useSession from '@/hooks/useSession';
import React from 'react';
import Letter from './Letter';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STATUS } from '@/types';

const GameEnd: React.FC<{ wordToGuess: string; status: STATUS }> = ({ wordToGuess = '', status }) => {
  const [, setSessionId] = useLocalStorage('sessionId', null);
  const { startNewGame, mutate } = useSession();

  const result = status === STATUS.SUCCESS ? 'You Won!' : 'You Lost!';

  const handleOnClick = async () => {
    const session = await startNewGame();
    await mutate(session, false);
    setSessionId(session.sessionId);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-1/5 flex flex-col items-center border rounded-md border-gray-200 shadow-lg">
        <div className="w-[100%] p-4 bg-slate-500 rounded-t-md text-center">
          <span className="text-2xl font-semibold text-white">{result}</span>
        </div>

        <div className="text-xl mb-5 p-4 flex flex-col items-center justify-start">
          <div className="mb-2">The word was: </div>
          <div className="flex justify-center items-center">
            {wordToGuess.split('').map((letter, idx) => {
              return (
                <div key={`${letter}-${idx}`} className="mr-1">
                  <Letter letter={letter} tw="bg-wl-green border-wl-green text-white w-8 h-8 p-5" />
                </div>
              );
            })}
          </div>

          <div className="mt-2 mb-2 text-sm">
            <a href={`https://wordfind.org/dictionary/${wordToGuess}`} target="_blank">
              What does this word mean?
            </a>
          </div>

          <button
            onClick={handleOnClick}
            className="border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            New game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
