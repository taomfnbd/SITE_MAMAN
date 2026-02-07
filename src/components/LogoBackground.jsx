import React from 'react';
import logoUrl from '../assets/logo-animation.svg';

const LogoBackground = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center -translate-x-[10%] md:translate-x-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <img 
        src={logoUrl} 
        alt="" 
        className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] object-contain max-w-none"
      />
    </div>
  );
};

export default LogoBackground;
