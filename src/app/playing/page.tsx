'use client';
import React from 'react';
import VirtualKeyboard, { KEYS, KeyPressType } from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';
import HowToPlay from '@/components/HowToPlay';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import useSession from '@/hooks/useSession';
import { Attempt, STATUS, SessionType } from '@/types';
import { useToast } from '../context/toast-provider';
import Toast from '@/components/Toast';

const WordleGame: React.FC<any> = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { session, error, isLoading, mutateSession, isSubmittingGuess, submitGuess } = useSession();
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

  console.log('errrrrrr', error);

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

      const newSession = await submitGuess({ sessionId, guess: curretGuess });

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

  if (isLoading || !session) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Something went wrong...</div>;
  }

  return (
    <div
      onMouseUp={() => {
        refDiv.current?.focus();
      }}
      className="flex min-h-screen flex-col items-center justify-center text-black"
    >
      <div className="w-[100%] flex flex-col justify-center items-center">
        <div className=" w-[100%] border-x-gray-200 border-2 shadow flex justify-between items-center mb-4 p-3">
          <div className="font-bold text-3xl">Wordle</div>
          <div className="flex items-center">
            <QuestionMarkCircleIcon onClick={() => setOpen(true)} className="w-8 h-8 cursor-pointer mr-5" />
            <Cog8ToothIcon className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
        <div className="w-[500px] h-auto flex flex-col justify-center items-center">
          <div className="h-96 mb-5 flex flex-col justify-between">
            {rows.map((row, idx) => {
              return (
                <Guess
                  key={idx}
                  current={currentIndexRow === idx}
                  attempt={currentIndexRow === idx ? currentRow : row}
                />
              );
            })}
          </div>

          <div ref={refDiv} tabIndex={-1} onKeyDown={handleKeyDown} className="w-[100%] outline-none">
            <VirtualKeyboard keyColors={session?.keyboardColor || {}} onKeyChange={handleKeyChange} />
          </div>

          <HowToPlay onClose={() => setOpen(false)} open={open} />
        </div>
      </div>
    </div>
  );
};

export default WordleGame;
