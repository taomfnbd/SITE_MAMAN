import React from 'react';
import logoUrl from '../assets/logo-formations.svg';

const LogoFormationBackground = () => {
  // Ajout d'un timestamp pour forcer le rechargement de l'animation à chaque montage
  const key = React.useMemo(() => Date.now(), []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-15">
      <img 
        key={key}
        src={`${logoUrl}?t=${key}`}
        alt="" 
        className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] object-contain max-w-none"
      />
    </div>
  );
};

export default LogoFormationBackground;
