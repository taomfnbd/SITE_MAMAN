import React, { useEffect } from 'react';

const ResalibBadge = ({ visible = true }) => {
  useEffect(() => {
    if (visible && !document.getElementById('resalib-sdk')) {
      const script = document.createElement('script');
      script.id = 'resalib-sdk';
      script.src = "https://www.resalib.fr/script/59867/badge.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-20 z-50 transform scale-90 origin-bottom-right">
       <div className="rlb-badge">
        <a 
          target="_blank" 
          rel="noopener noreferrer"
          href="https://www.resalib.fr/praticien/59867-floureto-ferigoule-therapeute-cranio-sacree-pierrefonds"
          style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%' }}
        >
          Retrouvez Floureto Férigoule sur Resalib
        </a>
       </div>
    </div>
  );
};

export default ResalibBadge;
