import React from 'react';
import SectionManager from '../../cms/SectionManager';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';

const Methode = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Pratique Manuelle - Méthode Poyet"
        description="Découvrez la Méthode Poyet, une thérapie manuelle douce issue de l'ostéopathie. Écoute crânienne et harmonisation énergétique à Pierrefonds."
        url="/pratique-manuelle"
        schema={{
            "@context": "https://schema.org",
            "@type": "MedicalTherapy",
            "name": "Méthode Poyet",
            "description": "Thérapie manuelle informationnelle et douce.",
            "alternateName": "Ostéopathie Poyet"
        }}
      />
      <Navbar />
      <PageHeader 
        pageId="methode"
        title="Pratique Manuelle" 
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
