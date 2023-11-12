import React from 'react';

interface HowToPlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100 ' : 'scale-125 opacity-0'}`}
      >
        <button onClick={onClose} className='absolute top-2 right-2'>X</button>
        {children}
      </div>
    </div>
  )
};

export default HowToPlay;