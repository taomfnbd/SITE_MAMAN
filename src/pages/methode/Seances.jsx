import React from 'react';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import SectionManager from '../../cms/SectionManager';

const Seances = () => {
  return (
    <div className="min-h-screen bg-paper pb-20 selection:bg-clay/30">
      <SEO 
        title="Tarifs & Séances"
        description="Tarifs des consultations de méthode Poyet à Pierrefonds. Séance adulte 70€, enfant 60€. Forfaits disponibles pour le suivi."
        url="/methode/seances"
      />
      <Navbar />
      <PageHeader 
        pageId="seances"
        title="La Séance"
        subtitle="Tarifs et informations pratiques"
      />
      
      <SectionManager pageId="seances" />
    </div>
  );
};

export default Seances;
