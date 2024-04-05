import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
  closeIcon?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, closeOnOutsideClick = true, closeIcon = false }) => {
  const handleCloseClickOutside = () => {
    if (closeOnOutsideClick) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleCloseClickOutside}
      className={`px-2 fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-xl bg-white rounded-xl shadow transition-all ${
          isOpen ? 'scale-100 opacity-100 ' : 'scale-125 opacity-0'
        }`}
      >
        {children}
        {/* {closeIcon && (
          <XMarkIcon className="w-6 h-6 cursor-pointer absolute top-2 right-2 hover:text-gray-700" onClick={onClose} />
        )} */}
      </div>
    </div>
  );
};

export default Modal;
