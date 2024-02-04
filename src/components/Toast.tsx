import React from 'react';

const Toast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="text-white text-sm p-2 bg-black rounded">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
