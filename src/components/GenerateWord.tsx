import React, { useState } from 'react';
import Modal from './common/Modal';
import ShareUrl from './common/ShareUrl';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import useSession, { CHALLENGE_API_URL } from '@/hooks/useSession';
import { usePathname } from 'next/navigation';
import { usePrevious } from '@/hooks/usePrevious';

export interface GenerateWordProps {
  onClose: () => void;
}

const GenerateWord: React.FC<GenerateWordProps> = ({ onClose }) => {
  const { validWords } = useSession();
  const ref = React.useRef({} as HTMLInputElement);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validateMsg, setValidateMsg] = useState<string>('');
  const pathname = usePathname();

  const handleGenerateLink = async () => {
    if (ref?.current) {
      const word = ref.current?.value.toLowerCase();

      if (word.length !== 5) {
        setValidateMsg('The word must have 5 letters');
        return;
      } else if (!/^[a-zA-Z]+$/.test(word)) {
        setValidateMsg('The word must contain only letters');
        return;
      } else if (!validWords.includes(word)) {
        setValidateMsg('The word is not correct');
        return;
      }

      setLoading(true);

      const response = await fetch(CHALLENGE_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      const { challengeId } = await response.json();

      const origin = window.location.origin;
      setUrl(`${origin}${pathname}?challengeId=${challengeId}`);

      setLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} closeOnOutsideClick={false}>
      <div className="generate-word rounded-lg shadow-md">
        <div className="relative round-t-lg border-b-2 border-b-white flex justify-center items-center p-2">
          <div className="text-lg font-bold">Wordle generator</div>
          <button onClick={onClose} className="absolute right-4 top-2 text-lg ">
            ✖
          </button>
        </div>

        <div className="flex flex-col items-center px-8 pt-4 pb-8">
          <p className="text-sm mb-2">Challenge your friends a word with 5 letters:</p>
          <input
            ref={ref}
            onChange={() => setValidateMsg('')}
            className="w-[100%] bg-gray-100 p-2 rounded-md focus:outline-none focus:bg-white"
            placeholder="Enter a word with 5 letters"
          />
          <span className="text-sm text-red-500 mb-2">{validateMsg}</span>
          <button className=" w-[100%] rounded-md bg-white p-2 text-sm" onClick={handleGenerateLink}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
          <div className='w-[100%] mt-2'>
            {url && <ShareUrl url={url} />}
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default GenerateWord;
