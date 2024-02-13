'use client';
import React from 'react';
import VirtualKeyboard, { KEYS, KeyPressType } from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';
import HowToPlay from '@/components/HowToPlay';
import { QuestionMarkCircleIcon, Cog8ToothIcon, PowerIcon } from '@heroicons/react/24/outline';
import useSession from '@/hooks/useSession';
import { Attempt, STATUS } from '@/types';
import { useToast } from '../context/toast-provider';
import Toast from '@/components/common/Toast';
import GiveUpModal from '@/components/common/GiveUpModal';
import Hint from '@/components/common/Hint';
import GameEnd from '@/components/GameEnd';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const WordleGame: React.FC<any> = () => {
  const [openHowToPlay, setOpenHowToPlay] = React.useState<boolean>(false);
  const [openEndSessionModal, setOpenEndSessionModal] = React.useState<boolean>(false);
  const { session, error, isLoading, mutateSession, isSubmittingGuess, submitGuess, endSession } = useSession();
  const toast = useToast();
  const currentIndexRow = session === undefined ? 0 : session?.attempts?.length;

  const defaultAttempt: Attempt = Array(5)
    .fill({ letter: '', className: '' })
    .map((item, idx) => ({ ...item, position: idx }));

  const generateRow = (pos: number) => session?.attempts[pos] || defaultAttempt;
  const rows = Array(6)
    .fill(0)
    .map((_, idx) => generateRow(idx));

  const [currentRow, setCurrentRow] = React.useState<Attempt>(defaultAttempt);

  const refDiv = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    refDiv.current?.focus();
  });

  const handleKeyChange = async (char: string) => {
    if (KeyPressType.ENTER === char) {
      const curretGuess = currentRow.reduce((acc, curr) => acc + curr.letter, '');
      const sessionId = session?.sessionId as string;

      if (curretGuess.length < 5) {
        toast.open({
          component: <Toast message="Please enter 5 letters" />,
          timeout: 5000,
        });
        return;
      }

      const newSession = await submitGuess({ guess: curretGuess, sessionId });

      if (
        newSession.status === STATUS.FAILED ||
        newSession.status === STATUS.SUCCESS ||
        newSession.status === STATUS.ENDED
      ) {
        return;
      }

      mutateSession({ ...newSession });
      setCurrentRow(defaultAttempt);
    } else if (KeyPressType.BACKSPACE === char) {
      const newCurrentRow = [...currentRow];
      let findEmpty = newCurrentRow.findIndex((item) => item.letter === '');
      if (findEmpty === -1) {
        findEmpty = newCurrentRow.length;
      }
      if (findEmpty === 0) {
        return;
      }
      newCurrentRow[findEmpty - 1] = { ...newCurrentRow[findEmpty - 1], letter: '' };
      setCurrentRow(newCurrentRow);
    } else {
      const newCurrentRow = [...currentRow];
      const findEmpty = newCurrentRow.findIndex((item) => item.letter === '');
      if (findEmpty === -1) {
        return;
      }
      newCurrentRow[findEmpty] = { ...newCurrentRow[findEmpty], letter: char };
      setCurrentRow(newCurrentRow);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let char = e.key.toLowerCase();
    if (char === 'backspace') {
      char = KeyPressType.BACKSPACE;
    }
    const allowKeys = KEYS.flat().filter((item) => item !== '');
    if (allowKeys.includes(char)) {
      handleKeyChange(char);
    }
  };

  const handleEndSession = async () => {
    setOpenEndSessionModal(false);
    const sessionId = session?.sessionId as string;
    const sessionEnded = await endSession({ sessionId });
    if (sessionEnded.status === STATUS.ENDED) {
      const word = sessionEnded?.wordToGuess;
      const wordSplit = word.split('');
      const newCurrentRow = currentRow.map((item, idx) => {
        return { ...item, letter: wordSplit[idx], green: true };
      });
      setCurrentRow(newCurrentRow);
    }
  };

  const isGameEnded =
    session?.status === STATUS.ENDED || session?.status === STATUS.SUCCESS || session?.status === STATUS.FAILED;

  if (isLoading || !session) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Something went wrong...</div>;
  }

  if (isGameEnded) {
    return <GameEnd wordToGuess={session.wordToGuess} />;
  }

  return (
    <div
      onMouseUp={() => {
        refDiv.current?.focus();
      }}
      className="flex items-center justify-center text-black"
    >
      <div className="min-h-screen w-[100%] flex flex-col justify-center items-center">
        <div className="w-[100%] border-x-gray-200 border shadow flex justify-center items-center mb-4 px-4 py-3">
          <div className="w-[350px] flex justify-start items-center">
            <button
              onClick={() => setOpenEndSessionModal(true)}
              className="mr-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Give up
            </button>
            <Hint sessionId={session?.sessionId} prevHints={session.hints} />
          </div>
          <div className="font-bold text-3xl text-center">Wordle</div>
          <div className="w-[350px] flex justify-end items-center">
            <QuestionMarkCircleIcon onClick={() => setOpenHowToPlay(true)} className="w-8 h-8 cursor-pointer mr-5" />
            <Cog8ToothIcon className="w-8 h-8 cursor-pointer text-wl-gray" />
          </div>
        </div>
        <div className="w-[500px] h-auto flex flex-col justify-center items-center">
          <div className="h-96 mb-5 flex flex-col justify-between">
            {rows.map((row, idx) => {
              return <Guess key={idx} attempt={currentIndexRow === idx ? currentRow : row} />;
            })}
          </div>

          <div ref={refDiv} tabIndex={-1} onKeyDown={handleKeyDown} className="w-[100%] outline-none">
            <VirtualKeyboard keyColors={session?.keyboardColor || {}} onKeyChange={handleKeyChange} />
          </div>

          <HowToPlay onClose={() => setOpenHowToPlay(false)} open={openHowToPlay} />

          <GiveUpModal
            open={openEndSessionModal}
            onClose={() => setOpenEndSessionModal(false)}
            onEndSession={handleEndSession}
          />
        </div>
      </div>
    </div>
  );
};

export default WordleGame;
