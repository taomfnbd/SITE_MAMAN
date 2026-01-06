import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SectionManager from '../../cms/SectionManager';

const Methode = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <Navbar />
      <PageHeader 
        pageId="methode"
        title="La Méthode Poyet" 
        subtitle="Une approche manuelle qui allie micro-mouvements précis et techniques énergétiques." 
      />
      
      {/* 
        Le contenu est géré par le CMS via SectionManager.
        Les sections par défaut (Intro, Concepts, Disclaimer) sont définies dans SectionManager.jsx
      */}
      <SectionManager pageId="methode" />

    </div>
  );
};

export default Methode;
