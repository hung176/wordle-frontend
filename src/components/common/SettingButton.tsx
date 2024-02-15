import React from 'react';
import { motion } from 'framer-motion';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
};
const setting = {
  rest: { rotate: 0 },
  hover: { rotate: 360, transition: { duration: 3 } },
};

const SettingButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.div onClick={onClick} variants={button} initial="rest" whileHover="hover" whileTap="pressed">
      <motion.div variants={setting}>
        <Cog8ToothIcon className="w-8 h-8 cursor-pointer text-wl-gray" />
      </motion.div>
    </motion.div>
  );
};

export default SettingButton;
