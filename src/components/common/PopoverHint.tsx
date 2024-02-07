import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import { useHints } from '@/hooks/useHints';
import { SessionType } from '@/types';
import { mutate } from 'swr';
import { START_API_URL } from '@/hooks/useSession';

const PopoverHint: React.FC<{ session: SessionType }> = ({ session }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { hintTrigger, isMutating } = useHints();

  const hints = session?.hints;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleGetHint = async () => {
    await hintTrigger({ sessionId: session?.sessionId });
    await mutate(START_API_URL);
  };

  return (
    <div className="relative">
      <LightBulbIcon onClick={handleOpen} className="w-8 h-8 cursor-pointer text-wl-yellow" />

      {isOpen && (
        <div className="absolute top-[2.5rem] rounded z-auto justify-center w-[350px] bg-yellow-50">
          <div className="p-4">You have three hints and one reveal the first letter</div>
          {hints && hints.length > 0 && (
            <div className="p-4">
              {hints.map((hint: string, idx: number) => {
                return <div className="font-semibold" key={idx}>{`Hint${idx + 1}: ${hint}`}</div>;
              })}
            </div>
          )}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-around items-center">
              <button
                className="align-middle select-none text-center transition-all text-xs py-2 px-4 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none"
                onClick={handleGetHint}
                disabled={isMutating || hints.length >= 3}
              >
                Get hints
              </button>
              <button className="align-middle select-none text-center transition-all text-xs py-2 px-4 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] rounded-full">
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
