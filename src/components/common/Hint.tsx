import React from 'react';
import { motion } from 'framer-motion';
import { useHint } from '@/hooks/useHints';
import { mutate } from 'swr';
import { START_API_URL } from '@/hooks/useSession';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const Hint: React.FC<{ sessionId: string; isDisabled: boolean; prevHints: string[] }> = ({
  sessionId,
  isDisabled = false,
  prevHints,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { generateHint, isMutating } = useHint();

  const isReachLimit = prevHints && prevHints.length >= 5;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGetHint = async () => {
    await generateHint({ sessionId });
    await mutate(START_API_URL);
  };

  return (
    <div className="relative mr-2">
      <motion.button
        disabled={isDisabled}
        onClick={handleOpen}
        variants={{
          rest: { x: 0, y: 0},
          hover: { backgroundImage: 'linear-gradient(to top, #dfe9f3 0%, white 100%)', transition: { duration: 0.7 } },
        }}
        initial="rest"
        whileHover="hover"
        className="px-2 py-1 w-20 h-7 border border-gray-200 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:ring focus:ring-gray-300"
      >
        Get hints
      </motion.button>

      {isOpen && (
        <div className="absolute top-[2.5rem] rounded-xl z-auto justify-center w-[15rem] min-[376px]:w-[20rem] bg-gray-100">
          <div className="px-4 pt-4">You have 5 hints</div>

          <div className="flex flex-col p-4">
            {prevHints.map((hint, index) => {
              return (
                <div key={index} className="flex flex-col mb-4">
                  <div className="py-2 px-4 bg-white rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black max-w-[260px]">
                    {hint}
                  </div>
                </div>
              );
            })}
            {isMutating && (
              <div className="flex space-x-2 justify-start items-center dark:invert">
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-around items-center">
              <button
                onClick={handleGetHint}
                disabled={isMutating || isReachLimit}
                className="flex items-center justify-between transition-all text-sm py-2 px-4 border border-gray-900 text-gray-900 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 focus:ring focus:ring-gray-300"
              >
                <div className="mr-2">You have {5 - prevHints.length} left</div>
                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
              </button>
              {/* <button
                className="align-middle select-none text-center transition-all text-sm py-2 px-4 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full"
                onClick={handleReveal}
              >
                Reveal letter
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hint;
