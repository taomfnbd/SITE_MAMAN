import React from 'react';
import Navbar from '../../components/Navbar';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import LogoFormationBackground from '../../components/LogoFormationBackground';
import SectionManager from '../../cms/SectionManager';

const Formations = () => {
  return (
    <div className="min-h-screen pb-20 selection:bg-clay/30 relative overflow-hidden">
      <SEO 
        title="Formations & Transmission"
        description="Enseignement de la méthode Poyet et de l'écoute tissulaire à Pierrefonds. Formations pour thérapeutes et particuliers."
        url="/formations"
        schema={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Formation Méthode Poyet",
            "description": "Transmission de l'art de l'écoute tissulaire et de la présence.",
            "provider": {
                "@type": "Person",
                "name": "Floureto Férigoule"
            }
        }}
      />
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
