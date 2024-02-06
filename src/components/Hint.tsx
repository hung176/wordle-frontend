import React from 'react';
import Modal from './Modal';

interface HintProps {
  open: boolean;
  onClose: () => void;
}

const Hint: React.FC<HintProps> = ({ open, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <h1>Hint</h1>
      <p className="mb-2">The word is a 5-letter word.</p>
      <button onClick={onClose} className="bg-wl-blue text-white px-4 py-2 rounded-md">
        Close
      </button>
    </Modal>
  );
};

export default Hint;
