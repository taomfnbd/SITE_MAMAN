import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import LogoFormationBackground from '../../components/LogoFormationBackground';
import SectionManager from '../../cms/SectionManager';

const Formations = () => {
  return (
    <div className="min-h-screen pb-20 selection:bg-clay/30 relative overflow-hidden">
      <div className="fixed inset-0 bg-paper -z-20"></div>
      <LogoFormationBackground />
      <Navbar />
      <PageHeader 
        pageId="formations"
        title="J'enseigne" 
        subtitle="Transmettre l'art de l'écoute tissulaire et de la présence." 
      />
      
      <SectionManager pageId="formations" />
    </div>
  );
};

export default Formations;
