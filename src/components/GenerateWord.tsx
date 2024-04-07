import React, { use } from 'react';
import Modal from './common/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

export interface GenerateWordProps {
  onClose: () => void;
}

const GenerateWord: React.FC<GenerateWordProps> = ({ onClose }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    ref.current?.focus();

    return () => {
      ref.current?.blur();
    };
  }, []);

  return (
    <Modal isOpen onClose={onClose} closeOnOutsideClick={false}>
      <div>
        <div className="bg-[#95D2DB] rounded-t-md relative flex justify-center items-center p-2">
          <div className="text-xl font-bold text-white">Wordle generator</div>
          <button onClick={onClose} className="absolute right-2 top-2 text-white text-xl ">
            ✖
          </button>
        </div>

        <div className="flex flex-col p-8">
          <p className="">Challenge friends a word with 5 letters:</p>
          <input
            className="bg-gray-100 p-2 rounded-md focus:outline-none"
            placeholder="Enter a word with 5 letters"
            ref={ref}
          />
          <p className="">or copy this word:</p>
          <div className="flex items-center justify-between text-gray-800 border border-gray-800 bg-white max-w-sm font-mono text-sm py-3 px-4 w-[250px] rounded-md">
            <div className="flex gap-1">
              <span>https://example.com</span>
            </div>
            <span className="flex text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200"></span>
            <ClipboardDocumentCheckIcon className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-400 duration-200" />
          </div>

          <button className="h-[40px] mt-4 rounded-md bg-gray-100 flex justify-center items-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
            Generate a link
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateWord;
