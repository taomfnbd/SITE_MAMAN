import React from 'react';
import { motion } from 'framer-motion';

const LogoAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Conteneur principal avec animation d'entrée et de flottement */}
      <motion.div 
        className="relative w-full max-w-3xl aspect-square flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          y: [0, -15, 0] // Animation de flottement (haut/bas)
        }}
        transition={{ 
          // Transition d'entrée
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 1.5, ease: "easeOut" },
          filter: { duration: 1.5, ease: "easeOut" },
          // Boucle de flottement infinie
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }
        }}
      >
        {/* 
          Logo avec correction de fond 
          L'image elle-même subit une légère respiration (scale)
        */}
        <motion.img 
          src="https://raw.githubusercontent.com/taomfnbd/logo/main/logo-premium-final-transparent.svg" 
          alt="Floureto Férigoule - Logo" 
          className="w-full h-full object-contain"
          style={{ 
            filter: "invert(1)", 
            mixBlendMode: "screen" 
          }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Lueur d'ambiance qui pulse doucement */}
        <motion.div 
          className="absolute inset-0 bg-clay/10 blur-[90px] rounded-full -z-10 pointer-events-none" 
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default LogoAnimation;