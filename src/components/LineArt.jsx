import React from 'react';
import { motion } from 'framer-motion';

// Une illustration abstraite et organique animée 
const LineArt = () => {
  return (
    <div className="w-full h-full flex items-center justify-center opacity-30">
      <svg width="400" height="600" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full h-auto">
        <motion.path 
          d="M100 50 C 140 50, 160 90, 150 130 C 140 170, 110 160, 100 200 C 90 240, 120 250, 100 280" 
          stroke="#D6C5B0" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M100 50 C 60 50, 40 90, 50 130 C 60 170, 90 160, 100 200 C 110 240, 80 250, 100 280" 
          stroke="#D6C5B0" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Abstract circles - couleur adaptée au fond sombre */}
        <motion.circle 
          cx="100" 
          cy="90" 
          r="20" 
          stroke="#F9F9F7" 
          strokeWidth="0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default LineArt;