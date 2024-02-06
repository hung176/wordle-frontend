import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  closeOnOutsideClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, closeOnOutsideClick = true }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-w-xl bg-white rounded-xl shadow py-6 px-8 transition-all ${
          isOpen ? 'scale-100 opacity-100 ' : 'scale-125 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
