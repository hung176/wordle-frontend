import useSession from '@/hooks/useSession';
import React from 'react';

export type SettingProps = {
  toggleSetting: () => void;
};

export type SettingType = {
  dailyMode: boolean;
  swapButton: boolean;
};

const Setting: React.FC<SettingProps> = ({ toggleSetting }) => {
  const { setting, setSetting } = useSession();
  const [settingState, setSettingState] = React.useState<SettingType>({ dailyMode: false, swapButton: false });
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <div className="w-[100%] h-[40px] mb-4 font-semibold text-xl rounded-xl bg-slate-200 flex justify-center items-center">
        Settings
      </div>
      <div className="w-[100%]">
        <div className="p-3 flex flex-col border-b border-gray-200">
          <div className="font-semibold text-lg mr-2">Daily Mode</div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex flex-col">
              <span>Guess a chain of words every 24 hours</span>
              <span>Next word update in...</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="dailyMode"
                type="checkbox"
                className="peer sr-only"
                onChange={(e) => console.log(e.target.checked)}
              />
              <label htmlFor="dailyMode" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
          </div>
        </div>

        <div className="p-3 flex flex-col border-b border-gray-200">
          <div className="font-semibold text-lg mr-2">Swap Buttons</div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500 text-sm flex flex-col">
              <span>Swap "Enter" and "Backspace" buttons</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="swapButton"
                type="checkbox"
                className="peer sr-only"
                onChange={(e) => console.log(e.target.checked)}
              />
              <label htmlFor="swapButton" className="hidden"></label>
              <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-200 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
