import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SectionManager from '../../cms/SectionManager';

const Ressources = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader 
        pageId="ressources"
        title="Ressources" 
        subtitle="Nourrir l'esprit pour comprendre le corps." 
      />
      <SectionManager pageId="ressources" />
    </div>
  );
};

export default Ressources;
