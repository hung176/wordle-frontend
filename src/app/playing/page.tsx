'use client';
import React, { useEffect } from 'react';
import VirtualKeyboard, { KEYS, KeyPressType } from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';
import HowToPlay from '@/components/HowToPlay';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import useSession, { startSession } from '@/hooks/useSession';
import { Attempt, STATUS, SessionType } from '@/types';
import { generateClassName } from '@/utils';

const WordleGame: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false);
  const { session, isError, isLoading, mutate, isMutating, submitGuess } = useSession();
  const current = (session?.attempts.length === undefined) ? 0 : session?.attempts.length;

  const defaultAttempt: Attempt = Array(5)
    .fill({ letter: '', className: '' })
    .map((item, idx) => ({ ...item, position: idx }));
  
  const rowX = (pos: number) => session?.attempts[pos] || defaultAttempt;
  const rows = [rowX(0), rowX(1), rowX(2), rowX(3), rowX(4), rowX(5)];
  
  const [currentRow, setCurrentRow] = React.useState<Attempt>(defaultAttempt);

  console.log('session', session);

  const handleKeyChange = async (char: string) => {
    if (KeyPressType.ENTER === char) {
      const curretGuess = currentRow.reduce((acc, curr) => acc + curr.letter, '');
      const sessionId = session?.sessionId as string;

      if (curretGuess.length < 5) {
        console.log('Please enter 5 letters');
        return;
      }

      const newSession = await submitGuess({ sessionId, guess: curretGuess });

      console.log('newSession', newSession);

      if (newSession.status === STATUS.FAILED || newSession.status === STATUS.SUCCESS || newSession.status === STATUS.ENDED) {
        return;
      }

      mutate({ ...newSession });
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

  const refDiv = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let char = e.key.toLowerCase();
    if (char === 'backspace') {
      char = KeyPressType.BACKSPACE;
    }
    const allowKeys = KEYS.flat().filter((item) => item !== '');
    if (allowKeys.includes(char)) {
      handleKeyChange(char);
    }
  }
  
  if (isLoading || !session) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div
      className='w-[100%] flex flex-col justify-center items-center'
      onMouseUp={() => {
        refDiv.current?.focus();
      }}
    >
      <div className=' w-[100%] border-x-gray-200 border-2 shadow flex justify-between items-center mb-4 p-3'>
        <div className='font-bold text-3xl'>Wordle</div>
        <div className='flex items-center'>
          <QuestionMarkCircleIcon onClick={() => setOpen(true)} className='w-8 h-8 cursor-pointer mr-5' />
          <Cog8ToothIcon className='w-8 h-8 cursor-pointer' />
        </div>
      </div>
      <div className='w-[500px] h-auto flex flex-col justify-center items-center'>
        <div className='h-96 mb-5 flex flex-col justify-between'>
          {rows.map((row, idx) => {
            return (
              <Guess key={idx} current={current === idx} attempt={current === idx ? currentRow : row} />
            );
          })}
        </div>

        <div ref={refDiv} tabIndex={-1} onKeyDown={handleKeyDown} className='w-[100%] outline-none'>
          <VirtualKeyboard keyColors={session.keyboardColor || {}} onKeyChange={handleKeyChange} />
        </div>

        <HowToPlay onClose={() => setOpen(false)} open={open} />
      </div>
    </div>
  );
};

export default WordleGame;
