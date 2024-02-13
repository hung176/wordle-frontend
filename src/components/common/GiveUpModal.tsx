import React from 'react';
import Modal from './Modal';

interface EndSessionProps {
  open: boolean;
  onClose: () => void;
  onEndSession: () => void;
}

const GiveUpModal: React.FC<EndSessionProps> = ({ open, onClose, onEndSession }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <p className="mb-2">Are you sure you want to end the session?</p>
      <div className="flex justify-end items-center">
        <button onClick={onEndSession} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400">
          End game
        </button>
        <button onClick={onClose} className="ml-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-200">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default GiveUpModal;
