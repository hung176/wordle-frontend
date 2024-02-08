import React from 'react';
import { LightBulbIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useHint } from '@/hooks/useHints';
import { mutate } from 'swr';
import { START_API_URL } from '@/hooks/useSession';

const PopoverHint: React.FC<{ sessionId: string; prevHints: string[] }> = ({ sessionId, prevHints }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { generateHint, isMutating } = useHint();

  const isReachLimit = prevHints.length >= 3;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGetHint = async () => {
    await generateHint({ sessionId });
    await mutate(START_API_URL);
  };

  return (
    <div className="relative">
      <LightBulbIcon onClick={handleOpen} className="w-8 h-8 cursor-pointer text-yellow-200" />

      {isOpen && (
        <div className="absolute top-[2.5rem] rounded z-auto justify-center w-[350px] bg-yellow-200">
          <div className="px-4 pt-4">You have three hints and one reveal the first letter</div>

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
                className="align-middle select-none text-center transition-all text-sm py-2 px-4 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
                onClick={handleGetHint}
                disabled={isMutating || isReachLimit}
              >
                {`Get hints (${3 - prevHints.length})`}
              </button>
              <button className="align-middle select-none text-center transition-all text-sm py-2 px-4 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full">
                Reveal letter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoverHint;
