'use client';
import React from 'react';
import { motion } from 'framer-motion';
import VirtualKeyboard, { KEYS, KeyPressType } from '@/components/VirtualKeyboard';
import Guess from '@/components/Guess';
import HowToPlay from '@/components/HowToPlay';
import { Cog8ToothIcon, QuestionMarkCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import useSession from '@/hooks/useSession';
import { Attempt, STATUS } from '@/types';
import { useToast } from '../context/toast-provider';
import Toast from '@/components/common/Toast';
import Hint from '@/components/common/Hint';
import GameEndModal from '@/components/common/GameEndModal';
import Setting, { SettingType } from '@/components/Setting';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const WordleGame: React.FC<any> = () => {
  const [openHowToPlay, setOpenHowToPlay] = React.useState<boolean>(false);
  const [openGameEndModal, setOpenGameEndModal] = React.useState<boolean>(false);

  const [isSettingOpen, setIsSettingOpen] = React.useState<boolean>(false);
  const defaultSetting: SettingType = {
    dailyMode: false,
    swapButton: false,
  };
  const [settingsStorage] = useLocalStorage('settings', defaultSetting);
  const [settings, setSettings] = React.useState<typeof defaultSetting>(settingsStorage || defaultSetting);

  const { session, validWords, error, isLoading, mutate, submitGuess, endSession, isMutating, isValidating } =
    useSession();
  const toast = useToast();

  const defaultAttempt: Attempt = Array(5)
    .fill({ letter: '' })
    .map((item, idx) => ({ ...item, position: idx }));

  const generateRow = (idx: number) => {
    if (session && session.attempts && Array.isArray(session.attempts[idx])) {
      return session.attempts[idx];
    }
    return defaultAttempt;
  };
  const rows = Array(6)
    .fill(0)
    .map((_, idx) => generateRow(idx));

  const [currentRow, setCurrentRow] = React.useState({ row: defaultAttempt, rowIndex: 0 });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(false);
  const [isShaking, setIsShaking] = React.useState<boolean>(false);
  console.log(isShaking);

  const refDiv = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    refDiv.current?.focus();
  });

  React.useEffect(() => {
    if (session && session?.attempts.length !== currentRow.rowIndex) {
      setCurrentRow({ ...currentRow, rowIndex: session?.attempts.length });
    }
  }, [session]);

  React.useEffect(() => {
    if (session?.status === STATUS.FAILED || session?.status === STATUS.SUCCESS || session?.status === STATUS.ENDED) {
      setOpenGameEndModal(true);
    }
  }, [session?.status]);

  React.useEffect(() => {
    if (openGameEndModal || openHowToPlay || isSettingOpen) {
      setIsShaking(false);
    }
  }, [openGameEndModal, openHowToPlay, isSettingOpen]);

  const isWin = session?.status === STATUS.SUCCESS;
  const isLose = session?.status === STATUS.FAILED || session?.status === STATUS.ENDED;

  const handleKeyChange = async (char: string) => {
    if (isWin || isLose) {
      return;
    }
    if (KeyPressType.ENTER === char) {
      setIsTyping(false);
      if (isSubmitting || isMutating || isValidating) {
        return;
      }

      const currentGuess = currentRow.row.reduce((acc, curr) => acc + curr.letter, '');
      const sessionId = session?.sessionId as string;

      if (currentGuess.length < 5) {
        toast.open({
          component: <Toast message="Please enter 5 letters" />,
          timeout: 4000,
        });
        return;
      }

      if (!validWords.includes(currentGuess)) {
        toast.open({
          component: <Toast message="The word is not in the list" />,
          timeout: 4000,
        });
        setIsShaking(true);
        return;
      }

      const newSession = await submitGuess({ guess: currentGuess, sessionId });
      const newCurrentRow = newSession.attempts[newSession.attempts.length - 1];
      setCurrentRow({ ...currentRow, row: newCurrentRow });
      setIsSubmitting(true);
      if (
        newSession.status === STATUS.FAILED ||
        newSession.status === STATUS.SUCCESS ||
        newSession.status === STATUS.ENDED
      ) {
        return;
      }
    } else if (KeyPressType.BACKSPACE === char) {
      setIsTyping(false);
      setIsShaking(false);
      const newCurrentRow = [...currentRow.row];
      let findEmpty = newCurrentRow.findIndex((item) => item.letter === '');
      if (findEmpty === -1) {
        findEmpty = newCurrentRow.length;
      }
      if (findEmpty === 0) {
        return;
      }
      newCurrentRow[findEmpty - 1] = { ...newCurrentRow[findEmpty - 1], letter: '' };
      setCurrentRow({ ...currentRow, row: newCurrentRow });
      setIsSubmitting(false);
    } else {
      setIsTyping(true);
      setIsShaking(false);
      const newCurrentRow = [...currentRow.row];
      const findEmpty = newCurrentRow.findIndex((item) => item.letter === '');
      if (findEmpty === -1) {
        return;
      }
      newCurrentRow[findEmpty] = { ...newCurrentRow[findEmpty], letter: char };
      setCurrentRow({ ...currentRow, row: newCurrentRow });
      setIsSubmitting(false);
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

  const handleGiveUp = async () => {
    setOpenGameEndModal(true);
    const sessionId = session?.sessionId as string;
    const sessionEnded = await endSession({ sessionId });
    mutate(sessionEnded);
  };

  const handleIncrementIndex = async () => {
    await mutate();
    setCurrentRow({ row: defaultAttempt, rowIndex: currentRow.rowIndex + 1 });
    setIsSubmitting(false);
  };

  const toggleSetting = () => {
    setIsSettingOpen(!isSettingOpen);
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
      className="w-screen h-screen flex justify-center items-center"
    >
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[300px] mobile:w-[500px] flex justify-center items-center mobile:mb-6 py-3">
          <div className="w-[350px] flex justify-start items-center">
            <Hint sessionId={session?.sessionId} prevHints={session.hints} isDisabled={isWin || isLose} />
            <motion.div
              className="bg-gray-200 rounded-md flex justify-center items-center p-1"
              initial="rest"
              variants={{
                rest: { y: 0 },
                hover: { y: [0, -5, 0], transition: { duration: 0.7 } },
              }}
              whileHover="hover"
            >
              <QuestionMarkCircleIcon onClick={() => setOpenHowToPlay(true)} className="w-6 h-6 cursor-pointer" />
            </motion.div>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <span className="hidden mobile:block mobile:font-bold mobile:text-3xl mr-1">Wordle+</span>
            <div className="bg-gray-200 rounded-md flex justify-center items-center p-1 mobile:hidden">
              <PlusCircleIcon className="w-6 h-6" />
            </div>
          </div>
          <div className="w-[350px] flex justify-end items-center">
            <motion.div
              className="bg-gray-200 rounded-md flex justify-center items-center p-1"
              onClick={toggleSetting}
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 },
                pressed: { scale: 0.95 },
              }}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
            >
              <motion.div
                variants={{
                  rest: { rotate: 0 },
                  hover: { rotate: 360, transition: { duration: 3 } },
                }}
              >
                <Cog8ToothIcon className="w-6 h-6 cursor-pointer text-wl-gray" />
              </motion.div>
            </motion.div>
            <button
              onClick={handleGiveUp}
              disabled={isLose || isWin}
              className="px-2 py-1 ml-2 w-20 h-7 bg-gray-200 rounded-md text-sm hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Give up
            </button>
          </div>
        </div>
        {isSettingOpen && (
          <div className="w-[100%] h-[540px] min-[376px]:h-[596px]">
            <Setting
              settings={settings}
              setSettings={setSettings}
              toggle={() => setIsSettingOpen(false)}
              isDisabledSetting={isWin || isLose}
            />
          </div>
        )}

        {!isSettingOpen && (
          <div className="w-[100%] p-2 flex flex-col justify-center items-center">
            <div className="mb-5 flex flex-col justify-between">
              {rows.map((row, idx) => {
                return (
                  <Guess
                    key={idx}
                    attempt={currentRow.rowIndex === idx ? currentRow.row : row}
                    isRowFlipping={currentRow.rowIndex === idx && isSubmitting}
                    isRowShaking={currentRow.rowIndex === idx && isShaking}
                    isRowTyping={currentRow.rowIndex === idx && isTyping}
                    incrementIndex={handleIncrementIndex}
                  />
                );
              })}
            </div>

            <div className="mb-5 flex justify-center items-center">
              {settings.dailyMode && (
                <span className="bg-gray-400 text-white font-medium me-2 px-2.5 py-0.5 rounded p-4 text-sm">
                  Daily Mode
                </span>
              )}
              {isWin && (
                <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  You Won!
                </span>
              )}
              {isLose && (
                <span className="bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 p-4 text-sm">
                  You Lost!
                </span>
              )}
            </div>

            <div ref={refDiv} tabIndex={-1} onKeyDown={handleKeyDown} className="outline-none">
              <VirtualKeyboard keyColors={session?.keyboardColor || {}} onKeyChange={handleKeyChange} />
            </div>

            {openHowToPlay && <HowToPlay onClose={() => setOpenHowToPlay(false)} />}
          </div>
        )}

        {openGameEndModal && (
          <GameEndModal
            word={session?.wordToGuess}
            isWin={isWin}
            onClose={() => setOpenGameEndModal(false)}
            setToDefaultRow={() => setCurrentRow({ rowIndex: 0, row: defaultAttempt })}
          />
        )}
      </div>
    </div>
  );
};

export default WordleGame;
