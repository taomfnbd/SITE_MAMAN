import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }} // Marge ajustée pour déclencher l'animation plus facilement
      transition={{ 
        duration: 1.0, 
        ease: "easeOut",
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;