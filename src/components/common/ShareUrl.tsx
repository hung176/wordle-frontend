import React from 'react';
import { useClipboard } from 'use-clipboard-copy';

export interface ShareUrlProps {
  url?: string;
  callback?: () => void;
}

const ShareUrl: React.FC<ShareUrlProps> = ({ url }) => {
  const clipboard = useClipboard({ copiedTimeout: 750 });
  return (
    <div className='w-[100%] flex items-center justify-between'>
      <input className="w-[90%] bg-gray-100 p-2 text-xs font-mono rounded-md" ref={clipboard.target} value={url} readOnly />

      <button
        className={`px-2 ml-2 w-10 h-6 text-center text-[11px] rounded-md ${clipboard.copied ? 'bg-wl-green' : 'bg-white'}`}
        onClick={clipboard.copy}
      >
        {clipboard.copied ? 'Copied' : 'Copy'}
        {/* {clipboard.isSupported() ? 'Copy Link' : 'Share Link'} */}
      </button>
    </div>
  );
};

export default ShareUrl;
