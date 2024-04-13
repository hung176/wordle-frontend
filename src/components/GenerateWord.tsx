import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './common/Modal';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import useSession, { SUBMIT_CHALLENGE_URL } from '@/hooks/useSession';
import { usePathname } from 'next/navigation';
import { useToast } from '@/app/context/toast-provider';
import Toast from './common/Toast';

export interface GenerateWordProps {
  onClose: () => void;
}

const GenerateWord: React.FC<GenerateWordProps> = ({ onClose }) => {
  const { validWords } = useSession();
  const [word, setWord] = useState<string>('');
  const [testMsg, setTestMsg] = useState<string>('');
  const pathname = usePathname();

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setWord(inputText);
    if (inputText.length !== 5) {
      setTestMsg('The word must have 5 letters');
    } else if (!/^[a-zA-Z]+$/.test(inputText)) {
      setTestMsg('The word must contain only letters');
    } else if (!validWords.includes(inputText)) {
      setTestMsg('The word is not correct');
    } else {
      setTestMsg('');
    }
  };

  const handleGenerateWord = async () => {
    if (testMsg) {
      return;
    }
    const response = await fetch(SUBMIT_CHALLENGE_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ word }),
    });

    const { challengeId } = await response.json();

    const origin = window.location.origin;
    const url = `${origin}${pathname}?challengeId=${challengeId}`;
    navigator.clipboard.writeText(url);
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
            value={word}
            onChange={handleWordChange}
            className="w-[100%] bg-gray-100 p-2 mb-2 rounded-md focus:outline-none focus:bg-white"
            placeholder="Enter a word with 5 letters"
          />
          <span className="text-sm text-red-300 mb-2">{testMsg}</span>
          <motion.button
            disabled={!!testMsg || !word}
            onClick={handleGenerateWord}
            className="p-2 text-sm mb-4 bg-white rounded-md flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-gray-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Copy link
          </motion.button>

          <p className="text-sm mb-2">or challenge this word:</p>
          <div className="flex items-center justify-between text-gray-800 border border-gray-800 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[250px] rounded-md">
            <div className="flex gap-1">
              <span>https://example.com</span>
            </div>
            <span className="flex text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200"></span>
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-400 duration-200" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateWord;
